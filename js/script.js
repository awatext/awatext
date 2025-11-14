const data = [
  { group: '关于我们', items: [
    {title:'GitHub',url:'https://github.com/awatext',desc:'AwAText',tags:['代码','平台']},
    {title:'Hack Chat',url:'https://hack.chat/?lounge',desc:'?lounge',tags:['问答','社区']}
  ]},
  { group: '阿瓦兰系列', items: [
    {title:'阿瓦兰文集',url:'https://book.awaland.dpdns.org',desc:'记录 AwALand',tags:['文档']},
    {title:'阿瓦兰邮箱',url:'https://mail.awaland.dpdns.org',desc:'匿名邮箱',tags:['工具']},
    {title:'阿瓦兰图床',url:'https://pic.awaland.dpdns.org',desc:'永久图床',tags:['工具']},
    {title:'阿瓦兰剪贴板',url:'https://clip.awaland.dpdns.org',desc:'在线剪贴板',tags:['工具']},
  ]},
  { group: '其他项目', items: [
    {title:'给DPG的留言',url:'https://dpg.awaland.dpdns.org',desc:'如题',tags:['历史']},
    {title:'HC客户端',url:'https://hc.awaland.dpdns.org',desc:'部署hc++源码',tags:['工具']},
  ]}
];

const groupsEl = document.getElementById('groups');
const searchEl = document.getElementById('search');
const themeToggle = document.getElementById('themeToggle');

function createLinkCard(item){
  const a = document.createElement('a');
  a.className = 'link-card';
  a.href = item.url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';

  const f = document.createElement('div'); f.className='favicon'; f.textContent = item.title[0] || '?';
  const m = document.createElement('div'); m.className='meta';
  const t = document.createElement('div'); t.className='title'; t.textContent = item.title;
  const d = document.createElement('div'); d.className='desc'; d.textContent = item.desc || '';
  m.appendChild(t); m.appendChild(d);
  a.appendChild(f); a.appendChild(m);
  return a;
}

function render(filter=''){
  groupsEl.innerHTML='';
  const q = filter.trim().toLowerCase();
  data.forEach(g=>{
    const groupEl = document.createElement('div'); groupEl.className='group';
    const h = document.createElement('h3'); h.textContent = g.group;
    groupEl.appendChild(h);
    let any=false;
    g.items.forEach(item=>{
      const hay = (item.title+ ' ' + (item.desc||'') + ' ' + (item.tags||[]).join(' ')).toLowerCase();
      if(!q || hay.includes(q)){
        any=true; groupEl.appendChild(createLinkCard(item));
      }
    });
    if(any) groupsEl.appendChild(groupEl);
  });
}

searchEl.addEventListener('input', e=> render(e.target.value));
themeToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('light');
});

// keyboard focus: pressing / focuses search
document.addEventListener('keydown', e=>{
  if(e.key === '/' && document.activeElement !== searchEl){
    e.preventDefault(); searchEl.focus(); searchEl.select();
  }
});

// initial render
render();
