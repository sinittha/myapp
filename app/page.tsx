
"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  memberPrice: number;
  image: string;
  specs: string;
  badge?: string;
};

const categories = [
  "ทั้งหมด",
  "โน้ตบุ๊ก",
  "คอมพิวเตอร์",
  "จอคอม",
  "คีย์บอร์ด",
  "หูฟัง",
  "เมาส์",
];

const products: Product[] = [
  {id:1,name:"ASUS ROG Strix G16",category:"โน้ตบุ๊ก",price:45900,memberPrice:42900,image:"photo-1496181133206-80ce9b88a853",specs:"Core i7 / RAM 16GB / RTX 4060",badge:"BEST SELLER"},
  {id:2,name:"ASUS TUF Gaming F15",category:"โน้ตบุ๊ก",price:32900,memberPrice:30900,image:"photo-1588872657578-7efd1f1555ed",specs:"Core i5 / RAM 16GB / RTX 4050"},
  {id:3,name:"MacBook Air M3",category:"โน้ตบุ๊ก",price:39900,memberPrice:37900,image:"photo-1517336714731-489689fd1ca8",specs:"Apple M3 / RAM 16GB / SSD 512GB"},
  {id:4,name:"Lenovo LOQ 15",category:"โน้ตบุ๊ก",price:28900,memberPrice:26900,image:"photo-1603302576837-37561b2e2302",specs:"Core i5 / RAM 16GB / RTX 3050"},
  {id:5,name:"MSI Katana 17",category:"โน้ตบุ๊ก",price:42900,memberPrice:39900,image:"photo-1496181133206-80ce9b88a853",specs:"Core i7 / RAM 16GB / RTX 4060"},
  {id:6,name:"Acer Aspire 5",category:"โน้ตบุ๊ก",price:19900,memberPrice:18500,image:"photo-1588872657578-7efd1f1555ed",specs:"Core i5 / RAM 8GB / SSD 512GB"},
  {id:7,name:"PC Gaming RTX 4060",category:"คอมพิวเตอร์",price:38900,memberPrice:35900,image:"photo-1587202372775-e229f172b9d7",specs:"Ryzen 7 / RAM 32GB / RTX 4060",badge:"HOT"},
  {id:8,name:"PC Workstation Pro",category:"คอมพิวเตอร์",price:52900,memberPrice:49900,image:"photo-1593640408182-31c70c8268f5",specs:"Core i7 / RAM 32GB / RTX 4070"},
  {id:9,name:"PC Office Business",category:"คอมพิวเตอร์",price:15900,memberPrice:14500,image:"photo-1587202372775-e229f172b9d7",specs:"Core i5 / RAM 16GB / SSD 512GB"},
  {id:10,name:"Samsung Odyssey G5",category:"จอคอม",price:8990,memberPrice:8290,image:"photo-1527443224154-c4a3942d3acf",specs:"27 นิ้ว / QHD / 165Hz"},
  {id:11,name:"LG UltraGear 27",category:"จอคอม",price:10900,memberPrice:9900,image:"photo-1527443224154-c4a3942d3acf",specs:"27 นิ้ว / IPS / 180Hz"},
  {id:12,name:"ASUS TUF Gaming Monitor",category:"จอคอม",price:12900,memberPrice:11900,image:"photo-1593640408182-31c70c8268f5",specs:"27 นิ้ว / QHD / 165Hz"},
  {id:13,name:"Logitech G Pro X",category:"คีย์บอร์ด",price:4990,memberPrice:4490,image:"photo-1587829741301-dc798b83add3",specs:"Mechanical / RGB / USB"},
  {id:14,name:"Razer BlackWidow V4",category:"คีย์บอร์ด",price:6290,memberPrice:5790,image:"photo-1587829741301-dc798b83add3",specs:"Mechanical / RGB / Gaming"},
  {id:15,name:"HyperX Cloud III",category:"หูฟัง",price:3290,memberPrice:2990,image:"photo-1505740420928-5e560c06d30e",specs:"7.1 Surround / Microphone"},
  {id:16,name:"Sony WH-1000XM5",category:"หูฟัง",price:11900,memberPrice:10900,image:"photo-1505740420928-5e560c06d30e",specs:"Wireless / Noise Cancelling"},
  {id:17,name:"Logitech G502 X",category:"เมาส์",price:2290,memberPrice:1990,image:"photo-1527814050087-3793815479db",specs:"Gaming / 25600 DPI"},
  {id:18,name:"Razer DeathAdder V3",category:"เมาส์",price:2490,memberPrice:2190,image:"photo-1527814050087-3793815479db",specs:"Ergonomic / 30000 DPI"},
];

const money = (n: number) =>
  "฿" + n.toLocaleString("th-TH");

export default function Page() {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState("home");
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cart, setCart] = useState<{id:number;qty:number}[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [member, setMember] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [payment, setPayment] = useState("โอนเงินผ่านธนาคาร");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("premium-pc-shop");
    if (data) {
      try {
        const d = JSON.parse(data);
        setCart(d.cart || []);
        setFavorites(d.favorites || []);
        setMember(d.member || false);
        setRegistered(d.registered || false);
        setName(d.name || "");
        setEmail(d.email || "");
        setPhone(d.phone || "");
        setAddress(d.address || "");
        setOrders(d.orders || []);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("premium-pc-shop", JSON.stringify({
      cart, favorites, member, registered,
      name, email, phone, address, orders
    }));
  }, [cart, favorites, member, registered, name, email, phone, address, orders]);

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      (category === "ทั้งหมด" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") list.sort((a,b) => a.price-b.price);
    if (sort === "high") list.sort((a,b) => b.price-a.price);
    return list;
  }, [category, search, sort]);

  const cartCount = cart.reduce((s,x)=>s+x.qty,0);
  const total = cart.reduce((s,x)=>{
    const p = products.find(p=>p.id===x.id);
    return s+(p ? (member ? p.memberPrice : p.price)*x.qty : 0);
  },0);

  const price = (p:Product) => member ? p.memberPrice : p.price;

  function go(p:string) {
    setPage(p);
    setMenu(false);
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function notify(t:string) {
    setMessage(t);
    window.setTimeout(()=>setMessage(""),2200);
  }

  function addCart(id:number) {
    setCart(old=>{
      const found=old.find(x=>x.id===id);
      return found
        ? old.map(x=>x.id===id?{...x,qty:x.qty+1}:x)
        : [...old,{id,qty:1}];
    });
    notify("เพิ่มสินค้าในตะกร้าแล้ว");
  }

  function changeQty(id:number,n:number) {
    setCart(old=>old.map(x=>x.id===id?{...x,qty:x.qty+n}:x).filter(x=>x.qty>0));
  }

  function toggleFavorite(id:number) {
    setFavorites(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);
  }

  function auth(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password || (mode==="register" && !name)) {
      notify("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    if(mode==="register") {
      setRegistered(true);
      setMember(true);
      notify("สมัครสมาชิกสำเร็จ! รับสิทธิ์ราคาพิเศษ");
    } else {
      setMember(registered);
      notify(registered?"ยินดีต้อนรับสมาชิก":"เข้าสู่ระบบสำเร็จ");
    }
    go("profile");
  }

  function checkout() {
    if(!member && !email) {
      go("auth");
      notify("กรุณาเข้าสู่ระบบก่อน");
      return;
    }
    if(!cart.length) return;
    setOrders(old=>[{
      id:"PC"+Date.now().toString().slice(-7),
      date:new Date().toLocaleDateString("th-TH"),
      items:cart,
      total,
      payment
    },...old]);
    setCart([]);
    notify("ยืนยันคำสั่งซื้อเรียบร้อย");
    go("orders");
  }

  const input = "w-full rounded-xl border border-slate-700 bg-[#111827] px-4 py-3 text-sm text-white outline-none focus:border-amber-400";

  function card(p:Product) {
    return (
      <article key={p.id} className="group overflow-hidden rounded-xl border border-slate-800 bg-[#111827] transition hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl hover:shadow-blue-950/40">
        <div className="relative aspect-square overflow-hidden bg-[#080D19] p-4">
          {p.badge && <span className="absolute left-3 top-3 z-10 rounded bg-amber-400 px-2 py-1 text-[9px] font-black tracking-wider text-black">{p.badge}</span>}
          <button onClick={()=>toggleFavorite(p.id)} className="absolute right-3 top-3 z-10 text-xl text-white">{favorites.includes(p.id)?"♥":"♡"}</button>
          <button onClick={()=>{setSelected(p);go("detail");}} className="h-full w-full">
            <img
              src={`https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=600&q=85`}
              alt={p.name}
              className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
            />
          </button>
        </div>
        <div className="p-3">
          <p className="text-[10px] font-semibold text-blue-300">{p.category}</p>
          <button onClick={()=>{setSelected(p);go("detail");}} className="mt-1 min-h-10 text-left text-sm font-bold text-white hover:text-amber-300">{p.name}</button>
          <p className="mt-1 min-h-8 text-[10px] text-slate-400">{p.specs}</p>
          <div className="mt-3 border-t border-slate-800 pt-3">
            {member ? (
              <>
                <p className="text-[10px] text-amber-400">MEMBER PRICE</p>
                <p className="text-lg font-black text-amber-300">{money(p.memberPrice)}</p>
                <p className="text-[10px] text-slate-500 line-through">{money(p.price)}</p>
              </>
            ) : (
              <>
                <p className="text-[10px] text-slate-400">ราคาทั่วไป</p>
                <p className="text-lg font-black text-white">{money(p.price)}</p>
                <button onClick={()=>go("auth")} className="text-[10px] text-amber-400 underline">สมัครสมาชิกเพื่อรับราคาพิเศษ</button>
              </>
            )}
            <button onClick={()=>addCart(p.id)} className="mt-3 w-full rounded-lg bg-gradient-to-r from-amber-400 to-yellow-600 py-2 text-xs font-black text-black hover:brightness-110">+ เพิ่มลงตะกร้า</button>
          </div>
        </div>
      </article>
    );
  }

  // SPLASH SCREEN
  if(!started) return (
    <main className="flex min-h-screen items-center justify-center bg-[#080D19] p-5">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl border border-amber-400/40 bg-gradient-to-br from-blue-900 to-purple-950 shadow-2xl shadow-blue-900/40">
          <span className="text-5xl">⌘</span>
        </div>
        <h1 className="mt-7 text-4xl font-black tracking-[.2em] text-white">PC SHOP</h1>
        <p className="mt-3 text-xs tracking-[.35em] text-amber-400">PREMIUM TECHNOLOGY STORE</p>
        <div className="mx-auto my-9 h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent"/>
        <button onClick={()=>setStarted(true)} className="w-full rounded-xl bg-gradient-to-r from-amber-300 to-yellow-600 py-4 font-black tracking-widest text-black shadow-xl shadow-amber-900/30 transition hover:brightness-110 active:scale-95">OPEN APPLICATION →</button>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#080D19] pb-12 text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#080D19]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={()=>setMenu(true)} className="text-2xl text-amber-400 hover:text-white">☰</button>
            <button onClick={()=>go("home")} className="text-left">
              <h1 className="text-xl font-black tracking-widest">PC <span className="text-amber-400">SHOP</span></h1>
              <p className="text-[9px] tracking-[.2em] text-slate-400">TECHNOLOGY STORE</p>
            </button>
          </div>
          <div className="flex items-center gap-3">
            {member && <span className="hidden rounded-full border border-amber-400/50 px-3 py-1 text-[10px] font-bold text-amber-300 sm:block">★ MEMBER</span>}
            <button onClick={()=>go("cart")} className="relative rounded-lg border border-slate-700 p-2 text-xl">🛒
              {cartCount>0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-black text-black">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      {menu && <div className="fixed inset-0 z-50 bg-black/70" onClick={()=>setMenu(false)}>
        <aside onClick={e=>e.stopPropagation()} className="h-full w-[290px] max-w-[85%] border-r border-slate-700 bg-[#0D1425] p-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-700 pb-5">
            <h2 className="font-black tracking-widest">PC <span className="text-amber-400">SHOP</span></h2>
            <button onClick={()=>setMenu(false)} className="text-2xl">×</button>
          </div>
          <div className="my-6 rounded-xl border border-amber-400/20 bg-gradient-to-br from-blue-950 to-purple-950 p-4">
            <p className="text-2xl">◈</p>
            <p className="mt-2 font-bold">{member?name||"สมาชิก PC Shop":"WELCOME"}</p>
            <p className="text-xs text-slate-400">{member?"สมาชิกพิเศษ":"เข้าสู่ระบบเพื่อรับสิทธิพิเศษ"}</p>
          </div>
          {[
            ["home","หน้าหลัก"],
            ["products","สินค้าทั้งหมด"],
            ["favorites","รายการโปรด"],
            ["cart","ตะกร้าสินค้า"],
            ["orders","ประวัติการสั่งซื้อ"],
            ["profile","โปรไฟล์"],
            ["auth",member?"บัญชีสมาชิก":"เข้าสู่ระบบ / สมัครสมาชิก"]
          ].map(([k,v])=><button key={k} onClick={()=>go(k)} className="mb-1 block w-full rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-amber-400">◇ {v}</button>)}
          <button onClick={()=>{setStarted(false);setMenu(false);}} className="mt-7 w-full rounded-lg border border-red-900 py-3 text-sm text-red-400">ออกจากแอป</button>
        </aside>
      </div>}

      <div className="mx-auto max-w-7xl px-4 py-6">

        {/* HOME */}
        {page==="home" && <div className="space-y-9">
          <section className="relative min-h-[300px] overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-r from-[#101D3A] via-[#251747] to-[#63451F] p-7 sm:p-12">
            <div className="relative z-10 max-w-xl">
              <span className="text-xs font-bold tracking-[.25em] text-amber-300">PREMIUM COLLECTION 2026</span>
              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">UPGRADE YOUR<br/><span className="text-amber-400">TECHNOLOGY</span></h2>
              <p className="mt-4 text-sm text-slate-300">อัปเกรดประสบการณ์เทคโนโลยี ด้วยอุปกรณ์คุณภาพระดับพรีเมียม</p>
              <button onClick={()=>go("products")} className="mt-7 rounded-lg bg-amber-400 px-7 py-3 text-sm font-black text-black">EXPLORE PRODUCTS →</button>
            </div>
            <div className="absolute bottom-0 right-0 h-full w-1/2 opacity-40">
              <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900" className="h-full w-full object-contain" alt="Laptop"/>
            </div>
          </section>

          {member && <div className="rounded-xl border border-amber-400/30 bg-gradient-to-r from-[#302348] to-[#172A50] p-5">
            <p className="text-xs tracking-widest text-amber-300">EXCLUSIVE MEMBER BENEFIT</p>
            <h3 className="mt-2 text-xl font-bold">ยินดีต้อนรับสมาชิก PC Shop</h3>
            <p className="mt-1 text-sm text-slate-300">คุณได้รับสิทธิ์ซื้อสินค้าในราคาสมาชิกพิเศษแล้ว</p>
          </div>}

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black tracking-wide">PRODUCT CATEGORIES</h2>
              <span className="text-xs text-amber-400">เลือกหมวดหมู่</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {categories.slice(1).map((c,i)=><button key={c} onClick={()=>{setCategory(c);go("products");}} className="rounded-xl border border-slate-800 bg-[#111827] p-5 text-left transition hover:border-amber-400 hover:bg-[#17223B]">
                <span className="text-2xl">{["💻","🖥️","▣","⌨️","🎧","🖱️"][i]}</span>
                <p className="mt-3 text-sm font-bold">{c}</p>
                <p className="mt-1 text-[10px] text-slate-500">EXPLORE →</p>
              </button>)}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-black tracking-wide">BEST SELLERS</h2>
              <button onClick={()=>go("products")} className="text-xs text-amber-400">VIEW ALL →</button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {products.filter(p=>p.badge).map(card)}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-black tracking-wide">ALL PRODUCTS</h2>
              <button onClick={()=>go("products")} className="text-xs text-amber-400">VIEW ALL →</button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {products.slice(4,12).map(card)}
            </div>
          </section>
        </div>}

        {/* PRODUCTS */}
        {page==="products" && <section>
          <h2 className="mb-5 text-2xl font-black">สินค้า <span className="text-amber-400">ทั้งหมด</span></h2>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ค้นหาสินค้า..." className={input}/>
          <div className="my-5 flex flex-wrap gap-2">
            {categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`rounded-lg border px-3 py-2 text-xs ${category===c?"border-amber-400 bg-amber-400 text-black font-bold":"border-slate-700 bg-slate-900 text-slate-300"}`}>{c}</button>)}
          </div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs text-slate-400">พบสินค้า {filtered.length} รายการ</p>
            <select value={sort} onChange={e=>setSort(e.target.value)} className="rounded-lg border border-slate-700 bg-[#111827] p-2 text-xs">
              <option value="default">เรียงตามปกติ</option>
              <option value="low">ราคาต่ำไปสูง</option>
              <option value="high">ราคาสูงไปต่ำ</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{filtered.map(card)}</div>
          {filtered.length===0 && <p className="py-16 text-center text-slate-400">ไม่พบสินค้า</p>}
        </section>}

        {/* DETAIL */}
        {page==="detail" && selected && <section>
          <button onClick={()=>go("products")} className="mb-5 text-sm text-amber-400">← กลับไปหน้าสินค้า</button>
          <div className="grid gap-7 rounded-2xl border border-slate-800 bg-[#111827] p-5 md:grid-cols-2 md:p-8">
            <div className="flex aspect-square items-center justify-center rounded-xl bg-[#080D19] p-6">
              <img src={`https://images.unsplash.com/${selected.image}?auto=format&fit=crop&w=900&q=85`} alt={selected.name} className="h-full w-full object-contain"/>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs tracking-widest text-amber-400">{selected.category}</p>
              <h2 className="mt-3 text-3xl font-black">{selected.name}</h2>
              <p className="mt-4 text-sm text-slate-400">{selected.specs}</p>
              <div className="my-7 border-y border-slate-700 py-5">
                <p className="text-xs text-slate-400">{member?"MEMBER PRICE":"ราคาปกติ"}</p>
                <p className="mt-1 text-3xl font-black text-amber-400">{money(price(selected))}</p>
                {member && <p className="text-xs text-slate-500 line-through">{money(selected.price)}</p>}
                {!member && <button onClick={()=>go("auth")} className="mt-2 text-xs text-amber-400 underline">สมัครสมาชิกเพื่อรับราคาพิเศษ</button>}
              </div>
              <button onClick={()=>addCart(selected.id)} className="rounded-lg bg-amber-400 py-4 font-black text-black">เพิ่มลงตะกร้า</button>
              <button onClick={()=>toggleFavorite(selected.id)} className="mt-3 rounded-lg border border-slate-700 py-3">{favorites.includes(selected.id)?"♥ อยู่ในรายการโปรดแล้ว":"♡ เพิ่มรายการโปรด"}</button>
            </div>
          </div>
        </section>}

        {/* CART */}
        {page==="cart" && <section>
          <h2 className="mb-5 text-2xl font-black">SHOPPING CART</h2>
          {!cart.length?<div className="rounded-xl border border-slate-800 bg-[#111827] p-12 text-center"><p className="text-4xl">🛒</p><p className="mt-4">ยังไม่มีสินค้าในตะกร้า</p><button onClick={()=>go("products")} className="mt-5 rounded-lg bg-amber-400 px-6 py-3 font-bold text-black">เลือกซื้อสินค้า</button></div>:
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="space-y-3 lg:col-span-2">
              {cart.map(item=>{const p=products.find(x=>x.id===item.id)!;return <div key={p.id} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#111827] p-3">
                <img src={`https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=250&q=80`} className="h-20 w-20 rounded-lg bg-[#080D19] object-contain" alt={p.name}/>
                <div className="min-w-0 flex-1"><p className="text-sm font-bold">{p.name}</p><p className="mt-1 text-amber-400">{money(price(p))}</p>
                  <div className="mt-2 flex items-center gap-3"><button onClick={()=>changeQty(p.id,-1)} className="rounded bg-slate-700 px-3">−</button>{item.qty}<button onClick={()=>changeQty(p.id,1)} className="rounded bg-slate-700 px-3">+</button></div>
                </div>
                <button onClick={()=>setCart(old=>old.filter(x=>x.id!==p.id))} className="text-red-400">ลบ</button>
              </div>})}
            </div>
            <div className="h-fit rounded-xl border border-slate-800 bg-[#111827] p-5">
              <h3 className="font-bold">สรุปคำสั่งซื้อ</h3>
              <div className="mt-5 flex justify-between text-sm"><span>ยอดรวม</span><span>{money(total)}</span></div>
              <div className="mt-3 flex justify-between text-sm"><span>จัดส่ง</span><span className="text-green-400">ฟรี</span></div>
              <hr className="my-5 border-slate-700"/>
              <div className="flex justify-between font-black"><span>ยอดสุทธิ</span><span className="text-amber-400">{money(total)}</span></div>
              <button onClick={()=>go("checkout")} className="mt-6 w-full rounded-lg bg-amber-400 py-3 font-black text-black">ดำเนินการชำระเงิน →</button>
            </div>
          </div>}
        </section>}

        {/* FAVORITES */}
        {page==="favorites" && <section>
          <h2 className="mb-5 text-2xl font-black">FAVORITES</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{products.filter(p=>favorites.includes(p.id)).map(card)}</div>
          {!favorites.length && <p className="py-12 text-center text-slate-400">ยังไม่มีรายการโปรด</p>}
        </section>}

        {/* AUTH */}
        {page==="auth" && <section className="mx-auto max-w-md rounded-2xl border border-slate-700 bg-[#111827] p-6 sm:p-9">
          <h2 className="text-center text-2xl font-black">PC <span className="text-amber-400">MEMBER</span></h2>
          <p className="mt-2 text-center text-xs text-slate-400">สมัครสมาชิกเพื่อรับราคาสินค้าสุดพิเศษ</p>
          <div className="my-6 grid grid-cols-2 rounded-lg bg-[#080D19] p-1">
            <button onClick={()=>setMode("login")} className={`rounded py-3 text-sm ${mode==="login"?"bg-amber-400 font-bold text-black":""}`}>เข้าสู่ระบบ</button>
            <button onClick={()=>setMode("register")} className={`rounded py-3 text-sm ${mode==="register"?"bg-amber-400 font-bold text-black":""}`}>สมัครสมาชิก</button>
          </div>
          <form onSubmit={auth} className="space-y-4">
            {mode==="register" && <input required value={name} onChange={e=>setName(e.target.value)} placeholder="ชื่อ - นามสกุล" className={input}/>}
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="อีเมล" className={input}/>
            {mode==="register" && <input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="เบอร์โทรศัพท์" className={input}/>}
            <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="รหัสผ่าน" className={input}/>
            <button className="w-full rounded-lg bg-gradient-to-r from-amber-300 to-yellow-600 py-4 font-black text-black">{mode==="login"?"เข้าสู่ระบบ":"สมัครสมาชิกและรับราคาพิเศษ"}</button>
          </form>
          <p className="mt-5 text-center text-[10px] text-slate-500">ระบบสมาชิกจำลองสำหรับทดลอง Prototype</p>
        </section>}

        {/* PROFILE */}
        {page==="profile" && <section className="mx-auto max-w-xl rounded-2xl border border-slate-800 bg-[#111827] p-6">
          <h2 className="text-2xl font-black">MY PROFILE</h2>
          {!member?<div className="py-10 text-center"><p className="text-slate-400">กรุณาเข้าสู่ระบบเพื่อดูข้อมูล</p><button onClick={()=>go("auth")} className="mt-5 rounded-lg bg-amber-400 px-6 py-3 font-bold text-black">เข้าสู่ระบบ</button></div>:
          <>
            <div className="my-6 rounded-xl border border-amber-400/30 bg-[#201B32] p-4"><p className="text-xs text-amber-400">PREMIUM MEMBER</p><h3 className="mt-2 text-xl font-bold">{name}</h3><p className="text-xs text-slate-400">{email}</p></div>
            <div className="mb-5 flex justify-between"><h3 className="font-bold">ข้อมูลส่วนตัว</h3><button onClick={()=>setEditing(!editing)} className="text-xs text-amber-400">{editing?"ยกเลิก":"แก้ไขข้อมูล"}</button></div>
            <div className="space-y-3">
              <input disabled={!editing} value={name} onChange={e=>setName(e.target.value)} placeholder="ชื่อ" className={input}/>
              <input disabled={!editing} value={email} onChange={e=>setEmail(e.target.value)} placeholder="อีเมล" className={input}/>
              <input disabled={!editing} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="เบอร์โทร" className={input}/>
              <textarea disabled={!editing} value={address} onChange={e=>setAddress(e.target.value)} placeholder="ที่อยู่จัดส่ง" className={input}/>
            </div>
            {editing && <button onClick={()=>{setEditing(false);notify("บันทึกข้อมูลแล้ว");}} className="mt-4 w-full rounded-lg bg-amber-400 py-3 font-bold text-black">บันทึกข้อมูล</button>}
            <button onClick={()=>go("orders")} className="mt-3 w-full rounded-lg border border-slate-700 py-3">ประวัติการสั่งซื้อ</button>
            <button onClick={()=>{setMember(false);go("home");notify("ออกจากระบบแล้ว");}} className="mt-3 w-full rounded-lg border border-red-900 py-3 text-red-400">ออกจากระบบ</button>
          </>}
        </section>}

        {/* CHECKOUT */}
        {page==="checkout" && <section className="mx-auto max-w-xl space-y-4">
          <h2 className="text-2xl font-black">CHECKOUT</h2>
          <div className="rounded-xl border border-slate-800 bg-[#111827] p-5">
            <h3 className="mb-4 font-bold">ข้อมูลผู้รับสินค้า</h3>
            <p className="text-sm">{name||"ยังไม่ได้ระบุชื่อ"}</p><p className="mt-2 text-sm text-slate-400">{phone||"ยังไม่ได้ระบุเบอร์โทร"}</p><p className="mt-2 text-sm text-slate-400">{address||"ยังไม่ได้ระบุที่อยู่"}</p>
            <button onClick={()=>go("profile")} className="mt-3 text-xs text-amber-400">แก้ไขข้อมูล →</button>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#111827] p-5">
            <h3 className="mb-4 font-bold">วิธีชำระเงิน</h3>
            {["โอนเงินผ่านธนาคาร","บัตรเครดิต / เดบิต","เก็บเงินปลายทาง"].map(x=><label key={x} className="mb-3 flex items-center gap-3 rounded-lg border border-slate-700 p-3 text-sm"><input type="radio" checked={payment===x} onChange={()=>setPayment(x)} />{x}</label>)}
            <hr className="my-4 border-slate-700"/>
            <div className="flex justify-between font-black"><span>ยอดสุทธิ</span><span className="text-amber-400">{money(total)}</span></div>
            <button onClick={checkout} disabled={!cart.length} className="mt-5 w-full rounded-lg bg-amber-400 py-4 font-black text-black disabled:opacity-40">ยืนยันคำสั่งซื้อ</button>
            <p className="mt-3 text-center text-[10px] text-slate-500">การชำระเงินเป็นการจำลองเท่านั้น</p>
          </div>
        </section>}

        {/* ORDERS */}
        {page==="orders" && <section>
          <h2 className="mb-5 text-2xl font-black">ORDER HISTORY</h2>
          {!orders.length?<p className="py-12 text-center text-slate-400">ยังไม่มีประวัติการสั่งซื้อ</p>:<div className="space-y-4">{orders.map(o=><div key={o.id} className="rounded-xl border border-slate-800 bg-[#111827] p-5"><div className="flex justify-between"><b>#{o.id}</b><span className="text-xs text-amber-400">สั่งซื้อสำเร็จ</span></div><p className="mt-2 text-xs text-slate-400">{o.date}</p>{o.items.map((it:{id:number;qty:number})=><p key={it.id} className="mt-2 text-sm">{products.find(p=>p.id===it.id)?.name} × {it.qty}</p>)}<hr className="my-3 border-slate-700"/><div className="flex justify-between font-bold"><span>ยอดรวม</span><span className="text-amber-400">{money(o.total)}</span></div><p className="mt-2 text-xs text-slate-400">{o.payment}</p></div>)}</div>}
        </section>}
      </div>

      {message && <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-xl border border-amber-400/30 bg-[#17223B] px-6 py-3 text-sm font-bold text-amber-300 shadow-xl">{message}</div>}
    </main>
  );
}
