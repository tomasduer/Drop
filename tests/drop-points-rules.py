"""Authenticated regression tests. Uses the requesting user's minted session; never prints credentials."""
import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
async def main():
 session=json.loads(Path.home().joinpath('.cache/lovable-auth/session.json').read_text())
 config={}
 for line in Path('.env').read_text().splitlines():
  if '=' in line:
   k,v=line.split('=',1);config[k]=v.strip().strip('"').strip("'")
 url=config['VITE_SUPABASE_URL'];key=config.get('VITE_SUPABASE_PUBLISHABLE_KEY') or config.get('VITE_SUPABASE_ANON_KEY')
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True);ctx=await b.new_context(viewport={'width':1280,'height':1800});page=await ctx.new_page()
  await page.goto('http://localhost:8080');await page.evaluate('([k,v])=>localStorage.setItem(k,v)',[session['storage_key'],json.dumps(session['session'])]);await page.goto('http://localhost:8080/mi-drop');await page.get_by_role('heading',name='Mi DROP',exact=True).wait_for();await page.wait_for_timeout(1500)
  async def api(path,body=None,method='POST'):
   return await page.evaluate('''async ([u,k,t,path,body,method])=>{const r=await fetch(u+'/rest/v1/'+path,{method,headers:{apikey:k,Authorization:'Bearer '+t,'Content-Type':'application/json'},...(body===null?{}:{body:JSON.stringify(body)})});return {status:r.status,data:await r.json()}}''',[url,key,session['session']['access_token'],path,body,method])
  async def rpc(name,body={}):return await api('rpc/'+name,body)
  before=(await rpc('drop_account_state'))['data'];assert before['profile'], 'authenticated profile must load'
  score_before=sum(b['score'] for b in before['balances'])
  a=await rpc('drop_mission_action',{'p_action':'start','p_payload':{'mission_id':'lali-trivia'}});assert a['status']==200 and a['data']['status']=='completed','completed daily attempt must remain completed'
  aid=a['data']['id'];replays=await asyncio.gather(*[rpc('drop_mission_action',{'p_action':'answer','p_payload':{'attempt_id':aid,'index':4,'answer':1}}) for _ in range(3)])
  assert all(r['status']==200 and r['data']['general_award']==150 and r['data']['campaign_award']==150 for r in replays),'one perfect trivia awards exactly 150 in each independent balance'
  after=(await rpc('drop_account_state'))['data'];assert after['profile']['general_points']==before['profile']['general_points'],'replay must not add general points'
  assert len(after['movements'])==len(before['movements']),'concurrent replays cannot add movements'
  assert sum(b['score'] for b in after['balances'])==score_before,'replays cannot increase campaign score'
  denied=await api('point_movements',{'user_id':before['profile']['id'],'amount':500,'reason':'mission_reward'});assert denied['status']>=400,'direct point forgery must be rejected'
  private=await api('mission_validation_rules?select=*',None,'GET');assert private['status']>=400,'answer keys must be private'
  demo=await rpc('drop_mission_action',{'p_action':'start','p_payload':{'mission_id':'lali-stream'}});assert demo['status']>=400,'demo streaming cannot award points'
  album='brava';assert album not in before['profile']['listened_albums'],'test album must initially be unmarked'
  mark={'p_action':'album','p_payload':{'album_id':album,'listened':True}}
  assert (await rpc('drop_points_action',mark))['status']==200
  assert (await rpc('drop_points_action',mark))['status']==200
  marked=(await rpc('drop_account_state'))['data'];assert marked['profile']['general_points']==before['profile']['general_points']+120,'album earns exactly 120 once'
  assert sum(b['score'] for b in marked['balances'])==score_before,'manual album earns no campaign participation'
  assert (await rpc('drop_points_action',{'p_action':'album','p_payload':{'album_id':album,'listened':False}}))['status']==200
  restored=(await rpc('drop_account_state'))['data'];assert restored['profile']['general_points']==before['profile']['general_points'],'unmark reverses 120 points atomically'
  assert restored['profile']['listened_albums']==before['profile']['listened_albums'],'test preserves album state'
  global_r=(await rpc('drop_ranking',{'p_campaign':'lali','p_scope':'Global'}))['data'];week=(await rpc('drop_ranking',{'p_campaign':'lali','p_scope':'Semanal'}))['data'];friends=(await rpc('drop_ranking',{'p_campaign':'lali','p_scope':'Amigos'}))['data']
  assert global_r['me']['score']==150 and week['me']['score']==150 and friends['me']['score']==150,'ranking scopes must use campaign participation'
  other=(await rpc('drop_ranking',{'p_campaign':'other','p_scope':'Global'}))['data'];assert other['me']['score']==0,'campaigns must remain independent'
  await page.reload();await page.get_by_text('Misión validada',exact=True).wait_for();assert await page.get_by_text('Pasar puntos a un ranking',exact=True).count()==0
  await b.close();print('PASS authenticated points rules: daily replay/concurrency, private solutions, direct forgery, demo non-award, album +120 once, reversal, campaign isolation, all ranking scopes and reload')
asyncio.run(main())
