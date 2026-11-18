
"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
  specs: string[];
  badge?: string;
};

const products: Product[] = [
  {
    id: 1, name: "ASUS Vivobook 15", category: "โน้ตบุ๊ก",
    price: 15990, oldPrice: 17990,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    specs: ["Intel Core i5", "RAM 8GB", "SSD 512GB"], badge: "BEST SELLER"
  },
  {
    id: 2, name: "Gaming Laptop Pro", category: "โน้ตบุ๊ก",
    price: 24990, oldPrice: 27990,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800",
    specs: ["Intel Core i7", "RAM 16GB", "RTX Graphics"], badge: "HOT"
  },
  {
    id: 3, name: "Acer Aspire 3", category: "โน้ตบุ๊ก",
    price: 12990, oldPrice: 14990,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
    specs: ["Intel Core i5", "RAM 8GB", "SSD 512GB"]
  },
  {
    id: 4, name: "Gaming PC RGB", category: "คอมพิวเตอร์",
    price: 22990, oldPrice: 25990,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800",
    specs: ["Core i5", "RAM 16GB", "RGB Case"], badge: "HOT"
  },
  {
    id: 5, name: "AOC Monitor 24", category: "จอคอม",
    price: 4990, oldPrice: 5990,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
    specs: ["24 นิ้ว", "Full HD", "IPS Panel"]
  },
  {
    id: 6, name: "Mechanical Keyboard", category: "คีย์บอร์ด",
    price: 1290, oldPrice: 1590,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    specs: ["Mechanical", "RGB Lighting", "USB"]
  },
  {
    id: 7, name: "Gaming Headset", category: "หูฟัง",
    price: 990, oldPrice: 1290,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    specs: ["Stereo Sound", "Microphone", "Comfort Fit"]
  },
  {
    id: 8, name: "Wireless Gaming Mouse", category: "เมาส์",
    price: 790, oldPrice: 990,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
    specs: ["Wireless", "Adjustable DPI", "Ergonomic"]
  },
];

const categories = [
  { name: "โน้ตบุ๊ก", icon: "💻" },
  { name: "คอมพิวเตอร์", icon: "🖥️" },
  { name: "จอคอม", icon: "🖥️" },
  { name: "คีย์บอร์ด", icon: "⌨️" },
  { name: "หูฟัง", icon: "🎧" },
  { name: "เมาส์", icon: "🖱️" },
];

const money = (n: number) => "฿" + n.toLocaleString("th-TH");

type CartItem = { id: number; qty: number };
type User = { name: string; email: string; phone: string; address: string };

export default function Page() {
  const [started, setStarted] = useState(false);
  const [exitDialog, setExitDialog] = useState(false);
  const [page, setPage] = useState("home");
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [user, setUser] = useState<User>({ name: "", email: "", phone: "", address: "" });
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [editing, setEditing] = useState(false);
  const [payment, setPayment] = useState("เก็บเงินปลายทาง");
  const [orders, setOrders] = useState<{ id: string; date: string; total: number; items: CartItem[]; payment: string }[]>([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const data = localStorage.getItem("pcshop-v2");
      if (data) {
        const d = JSON.parse(data);
        setCart(d.cart || []);
        setFavorites(d.favorites || []);
        setUser(d.user || { name: "", email: "", phone: "", address: "" });
        setLogged(d.logged || false);
        setOrders(d.orders || []);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("pcshop-v2", JSON.stringify({ cart, favorites, user, logged, orders }));
  }, [cart, favorites, user, logged, orders]);

  const count = cart.reduce((s, x) => s + x.qty, 0);
  const total = cart.reduce((s, x) => s + (products.find(p => p.id === x.id)?.price || 0) * x.qty, 0);

  const filtered = useMemo(() => {
    let data = products.filter(p =>
      (category === "ทั้งหมด" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") data = [...data].sort((a, b) => a.price - b.price);
    if (sort === "high") data = [...data].sort((a, b) => b.price - a.price);
    return data;
  }, [category, search, sort]);

  function go(p: string) {
    setPage(p);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function notify(message: string) {
    setNotice(message);
    setTimeout(() => setNotice(""), 2000);
  }

  function addCart(id: number) {
    setCart(old => {
      const found = old.find(x => x.id === id);
      return found
        ? old.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x)
        : [...old, { id, qty: 1 }];
    });
    notify("เพิ่มสินค้าลงตะกร้าแล้ว");
  }

  function changeQty(id: number, amount: number) {
    setCart(old => old.map(x => x.id === id ? { ...x, qty: x.qty + amount } : x).filter(x => x.qty > 0));
  }

  function toggleFavorite(id: number) {
    setFavorites(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  }

  function productCard(p: Product) {
    return (
      <article key={p.id} className="product-card group overflow-hidden rounded-2xl border border-white/10 bg-[#17191d] shadow-lg">
        <div className="product-image relative flex aspect-square items-center justify-center overflow-hidden bg-[#22252a] p-4">
          {p.badge && <span className="absolute left-3 top-3 z-10 rounded-md bg-yellow-400 px-2 py-1 text-[10px] font-black text-black">{p.badge}</span>}
          <button onClick={() => toggleFavorite(p.id)} aria-label="รายการโปรด" className="absolute right-3 top-3 z-10 text-xl text-yellow-400">
            {favorites.includes(p.id) ? "♥" : "♡"}
          </button>
          <img src={p.image} alt={p.name} className="h-full w-full object-contain transition duration-500 group-hover:scale-110" />
        </div>
        <div className="p-3 sm:p-4">
          <p className="text-[10px] font-bold tracking-widest text-yellow-400">{p.category}</p>
          <button onClick={() => { setSelected(p); go("detail"); }} className="mt-1 min-h-11 text-left text-sm font-bold text-white hover:text-yellow-400">{p.name}</button>
          <div className="mt-2 min-h-10 text-xs text-gray-400">{p.specs.join(" • ")}</div>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="font-black text-yellow-400">{money(p.price)}</p>
              <p className="text-xs text-gray-500 line-through">{money(p.oldPrice)}</p>
            </div>
            <button onClick={() => addCart(p.id)} className="rounded-lg bg-yellow-400 px-3 py-2 text-xs font-black text-black hover:bg-yellow-300">+ ใส่ตะกร้า</button>
          </div>
        </div>
      </article>
    );
  }

  const inputClass = "w-full rounded-xl border border-white/10 bg-[#22252a] px-4 py-3 text-sm text-white outline-none focus:border-yellow-400";

  if (!started) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101114] p-5 text-white">
        <section className="w-full max-w-md overflow-hidden rounded-[30px] border border-yellow-400/30 bg-[#191b20] shadow-2xl">
          <div className="relative overflow-hidden bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-16 text-center text-black">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[30px] border-white/20" />
            <div className="relative">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-black text-6xl shadow-2xl">💻</div>
              <h1 className="mt-7 text-5xl font-black tracking-tight">PC SHOP</h1>
              <p className="mt-2 font-bold tracking-widest">TECHNOLOGY STORE</p>
              <p className="mt-6 text-sm">ครบเครื่องเรื่องคอมพิวเตอร์</p>
            </div>
          </div>
          <div className="space-y-3 p-7">
            <button onClick={() => setStarted(true)} className="w-full rounded-xl bg-yellow-400 py-4 font-black text-black transition hover:bg-yellow-300">🚀 เปิดแอป</button>
            <button onClick={() => setExitDialog(true)} className="w-full rounded-xl border border-white/15 py-3 font-bold text-gray-400 hover:bg-white/5">ยกเลิก / ออกจากแอป</button>
            <p className="pt-3 text-center text-[10px] tracking-[3px] text-gray-500">PC SHOP • VERSION 2.0</p>
          </div>
          {exitDialog && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5"><div className="w-full max-w-sm rounded-2xl bg-[#202329] p-7 text-center"><div className="text-5xl">👋</div><h2 className="mt-4 text-xl font-black">ออกจากแอปแล้ว</h2><p className="mt-2 text-sm text-gray-400">ขอบคุณที่เข้ามาใช้บริการ</p><button onClick={() => setExitDialog(false)} className="mt-6 w-full rounded-xl bg-yellow-400 py-3 font-black text-black">กลับหน้าเปิดแอป</button></div></div>}
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101114] pb-24 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#15171b]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setMenu(true)} className="rounded-lg p-2 text-2xl hover:bg-white/10">☰</button>
            <button onClick={() => go("home")} className="text-left">
              <span className="block text-xl font-black tracking-wider text-yellow-400">PC SHOP<span className="text-white">.</span></span>
              <span className="text-[9px] tracking-[2px] text-gray-500">TECHNOLOGY STORE</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => go("favorites")} className="text-xl">♡</button>
            <button onClick={() => go("cart")} className="relative rounded-xl bg-yellow-400 p-2 text-xl text-black">🛒{count > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 text-xs text-white">{count}</span>}</button>
          </div>
        </div>
      </header>

      {menu && <div className="fixed inset-0 z-50 bg-black/70">
        <aside className="h-full w-[290px] max-w-[85%] overflow-y-auto border-r border-yellow-400/20 bg-[#17191d] p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <b className="text-xl text-yellow-400">PC SHOP.</b>
            <button onClick={() => setMenu(false)} className="text-2xl">×</button>
          </div>
          <div className="my-5 rounded-xl bg-[#25282e] p-4"><div className="text-3xl">👤</div><b className="mt-2 block">{logged ? user.name : "ยินดีต้อนรับ"}</b><p className="text-xs text-gray-400">{logged ? user.email : "สมาชิก PC Shop"}</p></div>
          {[
            ["home", "⌂", "หน้าหลัก"], ["products", "▦", "สินค้าทั้งหมด"],
            ["favorites", "♡", "รายการโปรด"], ["cart", "🛒", "ตะกร้าสินค้า"],
            ["orders", "▤", "ประวัติการสั่งซื้อ"], ["profile", "♙", "โปรไฟล์"],
            ["auth", "↪", "เข้าสู่ระบบ / สมัครสมาชิก"]
          ].map(([k, i, t]) => <button key={k} onClick={() => go(k)} className="flex w-full gap-4 rounded-xl px-4 py-3 text-left text-sm hover:bg-yellow-400 hover:text-black"><span>{i}</span>{t}</button>)}
          <button onClick={() => { setStarted(false); setMenu(false); }} className="mt-6 w-full rounded-xl border border-red-500/30 p-3 text-sm text-red-400">ออกจากแอป</button>
        </aside>
      </div>}

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6">
        {page === "home" && <>
          <section className="relative min-h-[280px] overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-r from-[#292b30] to-[#60490c] p-7 sm:p-12">
            <div className="relative z-10 max-w-lg">
              <span className="rounded bg-yellow-400 px-3 py-1 text-xs font-black text-black">SPECIAL OFFER</span>
              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">UPGRADE YOUR<br/><span className="text-yellow-400">TECH LIFE.</span></h1>
              <p className="mt-3 text-sm text-gray-300">อุปกรณ์ไอทีคุณภาพ พร้อมโปรโมชั่นสุดพิเศษ</p>
              <button onClick={() => go("products")} className="mt-6 rounded-lg bg-yellow-400 px-7 py-3 font-black text-black hover:bg-yellow-300">SHOP NOW →</button>
            </div>
            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900" alt="Laptop" className="absolute bottom-0 right-0 h-44 w-1/2 object-contain sm:h-64"/>
          </section>
          <section>
            <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black">หมวดหมู่สินค้า <span className="text-yellow-400">/ CATEGORY</span></h2></div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {categories.map(c => <button key={c.name} onClick={() => { setCategory(c.name); go("products"); }} className="rounded-2xl border border-white/10 bg-[#191b20] p-4 transition hover:-translate-y-1 hover:border-yellow-400"><span className="block text-3xl">{c.icon}</span><span className="mt-2 block text-xs font-bold">{c.name}</span></button>)}
            </div>
          </section>
          <section>
            <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black">🔥 สินค้าขายดี</h2><button onClick={() => go("products")} className="text-xs font-bold text-yellow-400">ดูทั้งหมด →</button></div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{products.filter(p => p.badge).map(productCard)}</div>
          </section>
          <section>
            <h2 className="mb-4 text-xl font-black">✨ สินค้าแนะนำ</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{products.slice(2, 6).map(productCard)}</div>
          </section>
        </>}

        {page === "products" && <>
          <h1 className="text-2xl font-black">สินค้าทั้งหมด <span className="text-yellow-400">/ PRODUCTS</span></h1>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหาสินค้าที่ต้องการ..." className={inputClass}/>
          <div className="flex flex-wrap gap-2">{["ทั้งหมด", ...categories.map(c => c.name)].map(c => <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-4 py-2 text-xs font-bold ${category === c ? "bg-yellow-400 text-black" : "border border-white/10 bg-[#191b20] text-gray-300"}`}>{c}</button>)}</div>
          <div className="flex items-center justify-between text-sm text-gray-400"><span>สินค้า {filtered.length} รายการ</span><select value={sort} onChange={e => setSort(e.target.value)} className="rounded-lg border border-white/10 bg-[#191b20] p-2 text-white"><option value="default">เรียงตามปกติ</option><option value="low">ราคาต่ำไปสูง</option><option value="high">ราคาสูงไปต่ำ</option></select></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{filtered.map(productCard)}</div>
          {filtered.length === 0 && <p className="py-16 text-center text-gray-400">ไม่พบสินค้าที่ค้นหา</p>}
        </>}

        {page === "detail" && selected && <section className="grid gap-7 rounded-3xl border border-white/10 bg-[#191b20] p-5 md:grid-cols-2 md:p-8">
          <div className="flex aspect-square items-center justify-center rounded-2xl bg-[#25282e] p-5"><img src={selected.image} alt={selected.name} className="h-full w-full object-contain"/></div>
          <div><button onClick={() => go("products")} className="mb-5 text-sm text-yellow-400">← กลับไปสินค้า</button><p className="text-sm text-yellow-400">{selected.category}</p><h1 className="mt-2 text-3xl font-black">{selected.name}</h1><p className="mt-5 text-3xl font-black text-yellow-400">{money(selected.price)}</p><p className="text-sm text-gray-500 line-through">{money(selected.oldPrice)}</p><h3 className="mt-8 font-bold">รายละเอียดสินค้า</h3>{selected.specs.map(s => <p key={s} className="mt-3 text-sm text-gray-300">✓ {s}</p>)}<div className="mt-8 flex gap-3"><button onClick={() => toggleFavorite(selected.id)} className="rounded-xl border border-white/20 px-5 py-3">♡</button><button onClick={() => addCart(selected.id)} className="flex-1 rounded-xl bg-yellow-400 py-3 font-black text-black">เพิ่มลงตะกร้า</button></div></div>
        </section>}

        {page === "cart" && <>
          <h1 className="text-2xl font-black">🛒 ตะกร้าสินค้า</h1>
          {cart.length === 0 ? <div className="rounded-2xl bg-[#191b20] p-12 text-center"><p className="text-5xl">🛒</p><p className="mt-4">ยังไม่มีสินค้าในตะกร้า</p><button onClick={() => go("products")} className="mt-5 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black">เลือกซื้อสินค้า</button></div> : <div className="grid gap-5 lg:grid-cols-3"><div className="space-y-3 lg:col-span-2">{cart.map(x => { const p = products.find(y => y.id === x.id)!; return <div key={x.id} className="flex items-center gap-3 rounded-xl bg-[#191b20] p-4"><img src={p.image} alt={p.name} className="h-20 w-20 rounded-lg bg-[#25282e] object-contain"/><div className="min-w-0 flex-1"><b>{p.name}</b><p className="text-yellow-400">{money(p.price)}</p><div className="mt-2 flex items-center gap-3"><button onClick={() => changeQty(x.id, -1)} className="rounded bg-[#333] px-3">−</button>{x.qty}<button onClick={() => changeQty(x.id, 1)} className="rounded bg-yellow-400 px-3 text-black">+</button></div></div><button onClick={() => setCart(old => old.filter(y => y.id !== x.id))} className="text-red-400">ลบ</button></div>; })}</div><div className="h-fit rounded-2xl bg-[#191b20] p-5"><h2 className="font-black">สรุปยอด</h2><div className="mt-5 flex justify-between"><span>ค่าจัดส่ง</span><span className="text-green-400">ฟรี</span></div><div className="mt-4 flex justify-between text-xl font-black"><span>รวม</span><span className="text-yellow-400">{money(total)}</span></div><button onClick={() => go("checkout")} className="mt-6 w-full rounded-xl bg-yellow-400 py-3 font-black text-black">ดำเนินการชำระเงิน →</button></div></div>}
        </>}

        {page === "favorites" && <><h1 className="text-2xl font-black">♡ รายการโปรด</h1><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{products.filter(p => favorites.includes(p.id)).map(productCard)}</div>{favorites.length === 0 && <p className="py-12 text-center text-gray-400">ยังไม่มีรายการโปรด</p>}</>}

        {page === "auth" && <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-[#191b20] p-7"><div className="text-center text-4xl">💻</div><h1 className="mt-3 text-center text-2xl font-black text-yellow-400">PC SHOP MEMBER</h1>{logged ? <div className="mt-6 text-center"><p>เข้าสู่ระบบแล้ว: {user.name}</p><button onClick={() => go("profile")} className="mt-5 w-full rounded-xl bg-yellow-400 py-3 font-bold text-black">ไปที่โปรไฟล์</button><button onClick={() => setLogged(false)} className="mt-3 w-full rounded-xl border border-red-400 py-3 text-red-400">ออกจากระบบ</button></div> : <><div className="mt-6 grid grid-cols-2 rounded-xl bg-[#292c32] p-1"><button onClick={() => setAuthMode("login")} className={`rounded-lg py-3 text-sm font-bold ${authMode === "login" ? "bg-yellow-400 text-black" : ""}`}>เข้าสู่ระบบ</button><button onClick={() => setAuthMode("register")} className={`rounded-lg py-3 text-sm font-bold ${authMode === "register" ? "bg-yellow-400 text-black" : ""}`}>สมัครสมาชิก</button></div><form onSubmit={e => { e.preventDefault(); if (authMode === "register" && !user.name) return notify("กรุณากรอกชื่อ"); setLogged(true); notify("เข้าสู่ระบบสำเร็จ"); go("profile"); }} className="mt-5 space-y-3">{authMode === "register" && <input required placeholder="ชื่อ - นามสกุล" className={inputClass} value={user.name} onChange={e => setUser({...user, name:e.target.value})}/>}<input required type="email" placeholder="อีเมล" className={inputClass} value={user.email} onChange={e => setUser({...user, email:e.target.value})}/>{authMode === "register" && <input placeholder="เบอร์โทรศัพท์" className={inputClass} value={user.phone} onChange={e => setUser({...user, phone:e.target.value})}/>}<input required type="password" placeholder="รหัสผ่าน" className={inputClass} value={password} onChange={e => setPassword(e.target.value)}/><button className="w-full rounded-xl bg-yellow-400 py-3 font-black text-black">{authMode === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}</button></form></>}</section>}

        {page === "profile" && <section className="mx-auto max-w-2xl rounded-3xl bg-[#191b20] p-6"><h1 className="text-2xl font-black">👤 โปรไฟล์</h1>{!logged ? <button onClick={() => go("auth")} className="mt-5 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black">เข้าสู่ระบบ</button> : <><div className="my-6 rounded-xl bg-[#25282e] p-5"><p className="text-xl font-bold">{user.name}</p><p className="text-sm text-gray-400">{user.email}</p></div><div className="mb-4 flex justify-between"><b>ข้อมูลส่วนตัว</b><button onClick={() => setEditing(!editing)} className="text-yellow-400">{editing ? "ยกเลิก" : "✎ แก้ไข"}</button></div><div className="space-y-3"><input disabled={!editing} className={inputClass} placeholder="ชื่อ" value={user.name} onChange={e => setUser({...user, name:e.target.value})}/><input disabled={!editing} className={inputClass} placeholder="อีเมล" value={user.email} onChange={e => setUser({...user, email:e.target.value})}/><input disabled={!editing} className={inputClass} placeholder="เบอร์โทร" value={user.phone} onChange={e => setUser({...user, phone:e.target.value})}/><textarea disabled={!editing} className={inputClass} placeholder="ที่อยู่จัดส่ง" value={user.address} onChange={e => setUser({...user, address:e.target.value})}/></div>{editing && <button onClick={() => { setEditing(false); notify("บันทึกข้อมูลแล้ว"); }} className="mt-4 w-full rounded-xl bg-yellow-400 py-3 font-black text-black">บันทึกข้อมูล</button>}<button onClick={() => go("orders")} className="mt-3 w-full rounded-xl border border-white/20 py-3">ประวัติการสั่งซื้อ</button><button onClick={() => { setLogged(false); go("home"); }} className="mt-3 w-full py-3 text-red-400">ออกจากระบบ</button></>}</section>}

        {page === "checkout" && <section className="mx-auto max-w-xl rounded-3xl bg-[#191b20] p-6"><h1 className="text-2xl font-black">ชำระเงิน</h1>{!logged ? <button onClick={() => go("auth")} className="mt-5 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black">เข้าสู่ระบบก่อน</button> : <><div className="mt-5 rounded-xl bg-[#25282e] p-4"><b>ข้อมูลผู้รับ</b><p className="mt-2 text-sm">{user.name}</p><p className="text-sm text-gray-400">{user.phone}</p><p className="text-sm text-gray-400">{user.address}</p><button onClick={() => go("profile")} className="mt-3 text-xs text-yellow-400">แก้ไขข้อมูล</button></div><h3 className="mb-3 mt-6 font-bold">ช่องทางชำระเงิน</h3>{["เก็บเงินปลายทาง", "โอนเงินผ่านธนาคาร", "บัตรเครดิต / เดบิต"].map(x => <label key={x} className="mb-2 flex items-center gap-3 rounded-xl border border-white/10 p-4 text-sm"><input type="radio" checked={payment === x} onChange={() => setPayment(x)}/>{x}</label>)}<div className="mt-6 flex justify-between text-xl font-black"><span>ยอดรวม</span><span className="text-yellow-400">{money(total)}</span></div><button disabled={!cart.length} onClick={() => { setOrders(old => [{ id: "PC" + Date.now(), date: new Date().toLocaleDateString("th-TH"), total, items: [...cart], payment }, ...old]); setCart([]); notify("ยืนยันคำสั่งซื้อสำเร็จ"); go("orders"); }} className="mt-5 w-full rounded-xl bg-yellow-400 py-4 font-black text-black disabled:opacity-40">ยืนยันคำสั่งซื้อ</button><p className="mt-3 text-center text-xs text-gray-500">ระบบชำระเงินจำลอง ไม่มีการตัดเงินจริง</p></>}</section>}

        {page === "orders" && <><h1 className="mb-5 text-2xl font-black">📦 ประวัติการสั่งซื้อ</h1>{!logged ? <button onClick={() => go("auth")} className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black">เข้าสู่ระบบ</button> : orders.length === 0 ? <p className="py-12 text-center text-gray-400">ยังไม่มีประวัติการสั่งซื้อ</p> : orders.map(o => <div key={o.id} className="mb-3 rounded-xl bg-[#191b20] p-5"><b>คำสั่งซื้อ #{o.id}</b><p className="mt-2 text-xs text-gray-400">{o.date}</p><p className="mt-3 font-black text-yellow-400">{money(o.total)}</p><p className="mt-2 text-xs text-gray-400">{o.payment}</p></div>)}</>}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#17191d]/95 backdrop-blur-xl">
        <div className="mx-auto grid max-w-2xl grid-cols-4 px-2 py-2">
          {[["home","⌂","หน้าหลัก"],["products","▦","สินค้า"],["favorites","♡","โปรด"],[logged ? "profile" : "auth","♙","บัญชี"]].map(([k,i,t]) => <button key={k} onClick={() => { if (k === "products") setCategory("ทั้งหมด"); go(k); }} className={`flex flex-col items-center gap-1 py-1 text-xs ${page === k ? "text-yellow-400" : "text-gray-500"}`}><span className="text-2xl">{i}</span>{t}</button>)}
        </div>
      </nav>
      {notice && <div className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-black text-black shadow-xl">✓ {notice}</div>}
    </main>
  );
}
