
"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  memberPrice: number;
  image: string;
  specs: string[];
};

type Account = {
  name: string;
  email: string;
  password: string;
  member: boolean;
  phone: string;
};

type CartItem = {
  id: number;
  qty: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "ASUS Vivobook 15",
    category: "โน้ตบุ๊ก",
    price: 15990,
    memberPrice: 14990,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    specs: ["Intel Core i5", "RAM 8GB", "SSD 512GB", "15.6 นิ้ว Full HD"],
  },
  {
    id: 2,
    name: "Lenovo LOQ Gaming",
    category: "โน้ตบุ๊ก",
    price: 27990,
    memberPrice: 25990,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
    specs: ["Intel Core i7", "RAM 16GB", "SSD 1TB", "Gaming Laptop"],
  },
  {
    id: 3,
    name: "Acer Aspire 3",
    category: "โน้ตบุ๊ก",
    price: 12990,
    memberPrice: 11990,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
    specs: ["Intel Core i5", "RAM 8GB", "SSD 512GB", "15.6 นิ้ว"],
  },
  {
    id: 4,
    name: "Gaming Desktop RGB",
    category: "คอมพิวเตอร์",
    price: 22990,
    memberPrice: 21490,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800",
    specs: ["Intel Core i5", "RAM 16GB", "SSD 1TB", "RGB Case"],
  },
  {
    id: 5,
    name: "AOC Monitor 24",
    category: "จอคอม",
    price: 4990,
    memberPrice: 4490,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
    specs: ["24 นิ้ว", "Full HD", "IPS", "75Hz"],
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    category: "คีย์บอร์ด",
    price: 1590,
    memberPrice: 1290,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    specs: ["Mechanical Switch", "RGB", "USB", "Anti-Ghosting"],
  },
  {
    id: 7,
    name: "Premium Headset",
    category: "หูฟัง",
    price: 1990,
    memberPrice: 1690,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    specs: ["Stereo Sound", "Microphone", "Wireless", "Comfort Fit"],
  },
  {
    id: 8,
    name: "Wireless Gaming Mouse",
    category: "เมาส์",
    price: 990,
    memberPrice: 790,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
    specs: ["Wireless", "Adjustable DPI", "Rechargeable", "Ergonomic"],
  },
];

const categories = [
  "ทั้งหมด", "โน้ตบุ๊ก", "คอมพิวเตอร์",
  "จอคอม", "คีย์บอร์ด", "หูฟัง", "เมาส์",
];

const money = (n: number) => "฿" + n.toLocaleString("th-TH");

export default function Page() {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState("home");
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ทั้งหมด");
  const [sort, setSort] = useState("default");
  const [selected, setSelected] = useState<Product | null>(null);

  const [account, setAccount] = useState<Account | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "",
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [notice, setNotice] = useState("");
  const [editing, setEditing] = useState(false);
  const [payment, setPayment] = useState("โอนเงินผ่านธนาคาร");
  const [address, setAddress] = useState("");

  const member = account?.member === true;

  useEffect(() => {
    try {
      const data = localStorage.getItem("pcshop-v2");
      if (data) {
        const d = JSON.parse(data);
        setAccounts(d.accounts || []);
        setAccount(d.account || null);
        setCart(d.cart || []);
        setFavorites(d.favorites || []);
        setOrders(d.orders || []);
        setAddress(d.address || "");
        setStarted(d.started || false);
      }
    } catch {
      console.log("Load error");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pcshop-v2", JSON.stringify({
      accounts, account, cart, favorites, orders, address, started,
    }));
  }, [accounts, account, cart, favorites, orders, address, started]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2200);
    return () => clearTimeout(timer);
  }, [notice]);

  const cartCount = cart.reduce((s, x) => s + x.qty, 0);

  const getPrice = (p: Product) =>
    member ? p.memberPrice : p.price;

  const total = cart.reduce((sum, item) => {
    const p = products.find(x => x.id === item.id);
    return sum + (p ? getPrice(p) * item.qty : 0);
  }, 0);

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      (category === "ทั้งหมด" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [category, search, sort]);

  function go(p: string) {
    setPage(p);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addCart(id: number) {
    setCart(old => {
      const found = old.find(x => x.id === id);
      return found
        ? old.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x)
        : [...old, { id, qty: 1 }];
    });
    setNotice("เพิ่มสินค้าลงตะกร้าแล้ว");
  }

  function changeQty(id: number, amount: number) {
    setCart(old => old
      .map(x => x.id === id ? { ...x, qty: x.qty + amount } : x)
      .filter(x => x.qty > 0)
    );
  }

  function toggleFav(id: number) {
    setFavorites(old => old.includes(id)
      ? old.filter(x => x !== id)
      : [...old, id]
    );
  }

  function submitAuth(e: React.FormEvent) {
    e.preventDefault();

    if (authMode === "register") {
      if (accounts.some(x => x.email === form.email)) {
        setNotice("อีเมลนี้สมัครสมาชิกแล้ว");
        return;
      }

      const newAccount: Account = {
        ...form,
        member: true,
      };

      setAccounts(old => [...old, newAccount]);
      setAccount(newAccount);
      setNotice("สมัครสมาชิกสำเร็จ! รับสิทธิ์ราคาสมาชิกแล้ว");
      go("profile");
      return;
    }

    const found = accounts.find(
      x => x.email === form.email && x.password === form.password
    );

    if (found) {
      setAccount(found);
      setNotice(found.member
        ? "เข้าสู่ระบบสมาชิกสำเร็จ"
        : "เข้าสู่ระบบสำเร็จ"
      );
      go("home");
    } else {
      // บัญชีที่ยังไม่มีในระบบ ทดลองเข้าสู่ระบบทั่วไปได้
      const normal: Account = {
        ...form,
        name: form.name || "ลูกค้าทั่วไป",
        member: false,
      };
      setAccount(normal);
      setAccounts(old => [...old, normal]);
      setNotice("เข้าสู่ระบบทั่วไปสำเร็จ");
      go("home");
    }
  }

  function logout() {
    setAccount(null);
    setNotice("ออกจากระบบแล้ว");
    go("home");
  }

  function checkout() {
    if (!account) {
      setNotice("กรุณาเข้าสู่ระบบก่อน");
      go("auth");
      return;
    }
    if (!cart.length) return;

    const order = {
      id: "PC" + Date.now().toString().slice(-7),
      date: new Date().toLocaleDateString("th-TH"),
      items: cart,
      total,
      status: "ยืนยันคำสั่งซื้อแล้ว",
      payment,
    };

    setOrders(old => [order, ...old]);
    setCart([]);
    setNotice("สั่งซื้อสำเร็จ");
    go("orders");
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

  function ProductCard({ p }: { p: Product }) {
    return (
      <article className="product-card overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="relative aspect-square overflow-hidden bg-[#f4f4f2] p-4">
          <img
            src={p.image}
            alt={p.name}
            className="h-full w-full object-contain mix-blend-multiply"
          />
          <button
            onClick={() => toggleFav(p.id)}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
            aria-label="เพิ่มรายการโปรด"
          >
            {favorites.includes(p.id) ? "♥" : "♡"}
          </button>
        </div>
        <div className="p-3 sm:p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            {p.category}
          </p>
          <button
            onClick={() => {
              setSelected(p);
              go("detail");
            }}
            className="mt-1 line-clamp-1 text-left text-sm font-bold hover:text-amber-700"
          >
            {p.name}
          </button>
          <div className="mt-3">
            <p className="text-base font-black">{money(getPrice(p))}</p>
            {member ? (
              <p className="mt-1 text-xs font-semibold text-emerald-700">
                MEMBER PRICE
              </p>
            ) : (
              <p className="mt-1 text-xs text-gray-400">
                สมัครสมาชิกเพื่อรับราคาพิเศษ
              </p>
            )}
            {member && (
              <p className="text-xs text-gray-400 line-through">
                ราคาปกติ {money(p.price)}
              </p>
            )}
          </div>
          <button
            onClick={() => addCart(p.id)}
            className="mt-4 w-full rounded-lg bg-[#252525] py-2.5 text-xs font-bold text-white transition hover:bg-amber-600"
          >
            เพิ่มลงตะกร้า
          </button>
        </div>
      </article>
    );
  }

  // หน้าเปิดแอป
  if (!started) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#17191c] p-5">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl border border-amber-400/40 bg-[#242629] text-5xl text-amber-400">
            PC
          </div>
          <h1 className="mt-7 text-4xl font-black tracking-[0.2em] text-white">
            PC SHOP
          </h1>
          <p className="mt-3 text-sm tracking-widest text-gray-400">
            PROFESSIONAL TECHNOLOGY STORE
          </p>
          <div className="mx-auto my-8 h-px w-16 bg-amber-400" />
          <button
            onClick={() => setStarted(true)}
            className="w-full rounded-lg bg-amber-400 py-4 font-bold tracking-widest text-black transition hover:bg-amber-300"
          >
            OPEN APPLICATION →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] pb-10 text-[#202124]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <button
            onClick={() => setMenu(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl hover:bg-gray-100"
            aria-label="เปิดเมนู"
          >
            ☰
          </button>

          <button onClick={() => go("home")} className="text-center">
            <span className="block text-xl font-black tracking-[0.16em]">
              PC<span className="text-amber-500"> SHOP</span>
            </span>
            <span className="text-[9px] tracking-[0.2em] text-gray-400">
              TECHNOLOGY STORE
            </span>
          </button>

          <button onClick={() => go("cart")} className="relative h-10 w-10 text-xl">
            🛒
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-bold text-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* SIDE MENU */}
      {menu && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMenu(false)}>
          <aside
            onClick={e => e.stopPropagation()}
            className="h-full w-[290px] max-w-[85%] bg-white p-5 shadow-2xl animate-slide-in"
          >
            <div className="flex items-center justify-between border-b pb-5">
              <b className="text-xl tracking-wider">PC SHOP</b>
              <button onClick={() => setMenu(false)} className="text-2xl">×</button>
            </div>

            <div className="my-5 rounded-xl bg-[#222427] p-4 text-white">
              <p className="text-xs text-gray-400">ACCOUNT</p>
              <p className="mt-2 font-bold">{account?.name || "ผู้เยี่ยมชม"}</p>
              <p className="mt-1 text-xs text-amber-400">
                {member ? "MEMBER ACCOUNT" : "GENERAL ACCOUNT"}
              </p>
            </div>

            {[
              ["home", "หน้าหลัก"],
              ["products", "สินค้าทั้งหมด"],
              ["favorites", "รายการโปรด"],
              ["cart", "ตะกร้าสินค้า"],
              ["orders", "ประวัติการสั่งซื้อ"],
              ["profile", "โปรไฟล์"],
              ["auth", account ? "บัญชีสมาชิก" : "เข้าสู่ระบบ / สมัครสมาชิก"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => go(key)}
                className="block w-full border-b border-gray-100 px-2 py-4 text-left text-sm font-semibold hover:bg-amber-50"
              >
                {label} <span className="float-right text-gray-400">›</span>
              </button>
            ))}

            <button
              onClick={() => {
                setStarted(false);
                setMenu(false);
              }}
              className="mt-6 w-full rounded-lg border border-red-200 py-3 text-sm font-bold text-red-600"
            >
              ออกจากแอป
            </button>
          </aside>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* HOME */}
        {page === "home" && (
          <div className="space-y-8">
            <section className="relative min-h-[280px] overflow-hidden rounded-2xl bg-[#202327] p-7 text-white sm:min-h-[340px] sm:p-12">
              <div className="relative z-10 max-w-lg">
                <p className="text-xs font-bold tracking-[0.3em] text-amber-400">
                  TECHNOLOGY PROMOTION
                </p>
                <h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
                  UPGRADE YOUR
                  <br />
                  DIGITAL LIFE.
                </h1>
                <p className="mt-4 text-sm text-gray-300">
                  อุปกรณ์คอมพิวเตอร์และเทคโนโลยี
                  <br />คุณภาพ พร้อมราคาที่คุ้มค่า
                </p>
                <button
                  onClick={() => go("products")}
                  className="mt-7 rounded-lg bg-amber-400 px-7 py-3 text-sm font-bold text-black hover:bg-amber-300"
                >
                  EXPLORE PRODUCTS →
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900"
                alt="Laptop"
                className="absolute bottom-0 right-0 h-full w-[48%] object-contain opacity-75"
              />
            </section>

            <section>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold tracking-widest text-amber-600">COLLECTION</p>
                  <h2 className="mt-1 text-xl font-black">หมวดหมู่สินค้า</h2>
                </div>
                <button onClick={() => go("products")} className="text-xs font-bold text-gray-500">
                  ดูสินค้าทั้งหมด →
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {categories.slice(1).map((c, i) => (
                  <button
                    key={c}
                    onClick={() => { setCategory(c); go("products"); }}
                    className="rounded-xl border border-gray-200 bg-white p-5 text-left transition hover:border-amber-400 hover:shadow-md"
                  >
                    <span className="text-xs text-amber-600">0{i + 1}</span>
                    <p className="mt-3 font-bold">{c}</p>
                    <p className="mt-2 text-xs text-gray-400">EXPLORE →</p>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold tracking-widest text-amber-600">BEST SELLERS</p>
                  <h2 className="mt-1 text-xl font-black">สินค้าขายดี</h2>
                </div>
                <button onClick={() => go("products")} className="text-xs font-bold text-gray-500">ดูทั้งหมด →</button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {products.slice(0, 4).map(p => <ProductCard key={p.id} p={p} />)}
              </div>
            </section>

            <section className="rounded-xl bg-[#242629] p-6 text-white sm:p-8">
              <p className="text-xs font-bold tracking-widest text-amber-400">EXCLUSIVE MEMBER BENEFITS</p>
              <h2 className="mt-3 text-2xl font-black">ราคาพิเศษสำหรับสมาชิก</h2>
              <p className="mt-2 text-sm text-gray-300">สมัครสมาชิกเพื่อรับส่วนลดสินค้าไอทีและสิทธิประโยชน์เพิ่มเติม</p>
              <button onClick={() => { setAuthMode("register"); go("auth"); }} className="mt-5 rounded-lg bg-amber-400 px-6 py-3 text-sm font-bold text-black">
                สมัครสมาชิก →
              </button>
            </section>
          </div>
        )}

        {/* PRODUCTS */}
        {page === "products" && (
          <section>
            <p className="text-xs font-bold tracking-widest text-amber-600">OUR COLLECTION</p>
            <h1 className="mb-5 mt-1 text-2xl font-black">สินค้าทั้งหมด</h1>
            <input className={inputClass} placeholder="ค้นหาชื่อสินค้า..." value={search} onChange={e => setSearch(e.target.value)} />
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)} className={`rounded-lg px-4 py-2 text-xs font-bold ${category === c ? "bg-[#252525] text-amber-400" : "border bg-white"}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="my-5 flex items-center justify-between text-sm">
              <span className="text-gray-500">สินค้า {filtered.length} รายการ</span>
              <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-lg border bg-white px-3 py-2">
                <option value="default">เรียงตามปกติ</option>
                <option value="low">ราคาต่ำไปสูง</option>
                <option value="high">ราคาสูงไปต่ำ</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
            {!filtered.length && <p className="py-12 text-center text-gray-400">ไม่พบสินค้า</p>}
          </section>
        )}

        {/* DETAIL */}
        {page === "detail" && selected && (
          <section>
            <button onClick={() => go("products")} className="mb-5 text-sm font-bold">← กลับไปสินค้า</button>
            <div className="grid gap-7 rounded-2xl bg-white p-5 sm:p-8 md:grid-cols-2">
              <div className="flex aspect-square items-center justify-center rounded-xl bg-[#f4f4f2] p-5">
                <img src={selected.image} alt={selected.name} className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-amber-600">{selected.category}</p>
                <h1 className="mt-3 text-3xl font-black">{selected.name}</h1>
                <p className="mt-3 text-sm text-gray-500">รายละเอียดและคุณสมบัติของสินค้า</p>
                <div className="mt-6 text-3xl font-black">{money(getPrice(selected))}</div>
                {member ? (
                  <p className="mt-1 text-sm font-semibold text-emerald-700">ราคาพิเศษสมาชิก (ปกติ {money(selected.price)})</p>
                ) : (
                  <button onClick={() => { setAuthMode("register"); go("auth"); }} className="mt-2 text-sm font-semibold text-amber-700">สมัครสมาชิกเพื่อรับราคาพิเศษ →</button>
                )}
                <hr className="my-6" />
                <h3 className="font-bold">ข้อมูลสินค้า</h3>
                <div className="mt-3 space-y-3">
                  {selected.specs.map(s => <p key={s} className="border-b pb-2 text-sm text-gray-600">✓ {s}</p>)}
                </div>
                <div className="mt-7 flex gap-3">
                  <button onClick={() => toggleFav(selected.id)} className="rounded-lg border px-5 py-3">♡</button>
                  <button onClick={() => addCart(selected.id)} className="flex-1 rounded-lg bg-[#252525] py-3 font-bold text-white">เพิ่มลงตะกร้า</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CART */}
        {page === "cart" && (
          <section>
            <h1 className="mb-5 text-2xl font-black">ตะกร้าสินค้า</h1>
            {!cart.length ? (
              <div className="rounded-xl bg-white p-12 text-center">
                <p className="text-gray-500">ยังไม่มีสินค้าในตะกร้า</p>
                <button onClick={() => go("products")} className="mt-5 rounded-lg bg-amber-400 px-6 py-3 font-bold">เลือกซื้อสินค้า</button>
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-3">
                <div className="space-y-3 lg:col-span-2">
                  {cart.map(item => {
                    const p = products.find(x => x.id === item.id)!;
                    return (
                      <div key={item.id} className="flex items-center gap-3 rounded-xl bg-white p-4">
                        <img src={p.image} alt={p.name} className="aspect-square w-20 rounded-lg bg-gray-100 object-contain" />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold">{p.name}</p>
                          <p className="mt-1 font-bold">{money(getPrice(p))}</p>
                          <div className="mt-2 flex items-center gap-3">
                            <button onClick={() => changeQty(p.id, -1)} className="h-8 w-8 rounded border">−</button>
                            {item.qty}
                            <button onClick={() => changeQty(p.id, 1)} className="h-8 w-8 rounded border">+</button>
                          </div>
                        </div>
                        <button onClick={() => setCart(old => old.filter(x => x.id !== p.id))} className="text-sm text-red-500">ลบ</button>
                      </div>
                    );
                  })}
                </div>
                <div className="h-fit rounded-xl bg-white p-5">
                  <h2 className="font-black">สรุปยอดชำระ</h2>
                  <div className="my-5 flex justify-between"><span>ยอดรวม</span><b>{money(total)}</b></div>
                  <div className="flex justify-between text-sm"><span>ค่าจัดส่ง</span><span className="text-green-600">ฟรี</span></div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-lg font-black"><span>ยอดสุทธิ</span><span>{money(total)}</span></div>
                  <button onClick={() => go("checkout")} className="mt-6 w-full rounded-lg bg-amber-400 py-3 font-bold">ดำเนินการชำระเงิน →</button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* FAVORITES */}
        {page === "favorites" && (
          <section>
            <h1 className="mb-5 text-2xl font-black">รายการโปรด</h1>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {products.filter(p => favorites.includes(p.id)).map(p => <ProductCard key={p.id} p={p} />)}
            </div>
            {!favorites.length && <p className="rounded-xl bg-white p-12 text-center text-gray-400">ยังไม่มีรายการโปรด</p>}
          </section>
        )}

        {/* LOGIN / REGISTER */}
        {page === "auth" && (
          <section className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            {account ? (
              <div className="text-center">
                <div className="text-3xl font-black">{account.name}</div>
                <p className="mt-2 text-sm text-gray-500">{account.email}</p>
                <div className={`mt-5 rounded-lg p-4 text-sm font-bold ${member ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-600"}`}>
                  {member ? "MEMBER — ราคาพิเศษสมาชิก" : "GENERAL — ราคาปกติ"}
                </div>
                <button onClick={logout} className="mt-5 w-full rounded-lg border border-red-200 py-3 text-red-600">ออกจากระบบ</button>
              </div>
            ) : (
              <>
                <p className="text-center text-xs font-bold tracking-widest text-amber-600">PC SHOP ACCOUNT</p>
                <h1 className="mt-2 text-center text-2xl font-black">{authMode === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}</h1>
                <div className="mt-6 grid grid-cols-2 rounded-lg bg-gray-100 p-1">
                  <button onClick={() => setAuthMode("login")} className={`rounded-md py-3 text-sm font-bold ${authMode === "login" ? "bg-white shadow" : ""}`}>เข้าสู่ระบบ</button>
                  <button onClick={() => setAuthMode("register")} className={`rounded-md py-3 text-sm font-bold ${authMode === "register" ? "bg-amber-400" : ""}`}>สมัครสมาชิก</button>
                </div>
                {authMode === "register" && (
                  <div className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
                    สมัครสมาชิกเพื่อรับราคาสินค้าพิเศษทันที
                  </div>
                )}
                <form onSubmit={submitAuth} className="mt-5 space-y-4">
                  {authMode === "register" && (
                    <>
                      <input required className={inputClass} placeholder="ชื่อ - นามสกุล" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
                      <input className={inputClass} placeholder="เบอร์โทรศัพท์" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
                    </>
                  )}
                  <input required type="email" className={inputClass} placeholder="อีเมล" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
                  <input required type="password" className={inputClass} placeholder="รหัสผ่าน" value={form.password} onChange={e => setForm({...form, password:e.target.value})} />
                  <button className="w-full rounded-lg bg-[#252525] py-4 font-bold text-amber-400 hover:bg-black">
                    {authMode === "register" ? "สมัครสมาชิกและรับสิทธิ์" : "เข้าสู่ระบบ"}
                  </button>
                </form>
                <p className="mt-5 text-center text-xs text-gray-400">Prototype สำหรับทดลองใช้งานเท่านั้น</p>
              </>
            )}
          </section>
        )}

        {/* PROFILE */}
        {page === "profile" && (
          <section className="mx-auto max-w-2xl rounded-xl bg-white p-6">
            <h1 className="text-2xl font-black">โปรไฟล์ของฉัน</h1>
            {!account ? (
              <button onClick={() => go("auth")} className="mt-5 rounded-lg bg-amber-400 px-6 py-3 font-bold">เข้าสู่ระบบ</button>
            ) : (
              <>
                <div className="my-5 rounded-xl bg-[#252525] p-5 text-white">
                  <p className="text-xs text-gray-400">ACCOUNT TYPE</p>
                  <p className="mt-2 text-xl font-bold">{member ? "MEMBER" : "GENERAL ACCOUNT"}</p>
                  <p className="mt-2 text-sm text-amber-400">{account.email}</p>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold">ชื่อสมาชิก
                    <input disabled={!editing} className={`${inputClass} mt-2`} value={account.name} onChange={e => setAccount({...account, name:e.target.value})} />
                  </label>
                  <label className="block text-sm font-bold">อีเมล
                    <input disabled className={`${inputClass} mt-2`} value={account.email} />
                  </label>
                  <label className="block text-sm font-bold">เบอร์โทรศัพท์
                    <input disabled={!editing} className={`${inputClass} mt-2`} value={account.phone} onChange={e => setAccount({...account, phone:e.target.value})} />
                  </label>
                  <label className="block text-sm font-bold">ที่อยู่จัดส่ง
                    <textarea disabled={!editing} className={`${inputClass} mt-2`} rows={3} value={address} onChange={e => setAddress(e.target.value)} />
                  </label>
                </div>
                {editing ? (
                  <button onClick={() => { setEditing(false); setNotice("บันทึกข้อมูลแล้ว"); }} className="mt-5 w-full rounded-lg bg-amber-400 py-3 font-bold">บันทึกข้อมูล</button>
                ) : (
                  <button onClick={() => setEditing(true)} className="mt-5 w-full rounded-lg border py-3 font-bold">แก้ไขข้อมูล</button>
                )}
                <button onClick={() => go("orders")} className="mt-3 w-full rounded-lg border py-3">ประวัติการสั่งซื้อ</button>
                <button onClick={logout} className="mt-3 w-full rounded-lg border border-red-200 py-3 text-red-600">ออกจากระบบ</button>
              </>
            )}
          </section>
        )}

        {/* CHECKOUT */}
        {page === "checkout" && (
          <section className="mx-auto max-w-2xl space-y-5">
            <h1 className="text-2xl font-black">ชำระเงิน</h1>
            {!account ? (
              <div className="rounded-xl bg-white p-8 text-center">
                <p>กรุณาเข้าสู่ระบบก่อนชำระเงิน</p>
                <button onClick={() => go("auth")} className="mt-4 rounded-lg bg-amber-400 px-6 py-3 font-bold">เข้าสู่ระบบ</button>
              </div>
            ) : (
              <>
                <div className="rounded-xl bg-white p-5">
                  <h2 className="font-bold">ข้อมูลจัดส่ง</h2>
                  <p className="mt-3 text-sm">{account.name}</p>
                  <p className="mt-2 text-sm text-gray-500">{account.phone}</p>
                  <p className="mt-2 text-sm text-gray-500">{address || "ยังไม่ได้ระบุที่อยู่"}</p>
                  <button onClick={() => go("profile")} className="mt-3 text-sm font-bold text-amber-700">แก้ไขข้อมูล →</button>
                </div>
                <div className="rounded-xl bg-white p-5">
                  <h2 className="mb-4 font-bold">วิธีชำระเงิน</h2>
                  {["โอนเงินผ่านธนาคาร", "บัตรเครดิต / เดบิต", "เก็บเงินปลายทาง"].map(x => (
                    <label key={x} className="mb-3 flex items-center gap-3 rounded-lg border p-4 text-sm">
                      <input type="radio" checked={payment === x} onChange={() => setPayment(x)} />
                      {x}
                    </label>
                  ))}
                </div>
                <div className="rounded-xl bg-white p-5">
                  <div className="flex justify-between"><span>ยอดรวม</span><b>{money(total)}</b></div>
                  <div className="mt-3 flex justify-between text-sm"><span>จัดส่ง</span><span className="text-green-600">ฟรี</span></div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-xl font-black"><span>ยอดสุทธิ</span><span>{money(total)}</span></div>
                  <button disabled={!cart.length} onClick={checkout} className="mt-6 w-full rounded-lg bg-amber-400 py-4 font-bold disabled:opacity-40">ยืนยันคำสั่งซื้อ</button>
                  <p className="mt-3 text-center text-xs text-gray-400">ระบบชำระเงินจำลอง ไม่มีการตัดเงินจริง</p>
                </div>
              </>
            )}
          </section>
        )}

        {/* ORDERS */}
        {page === "orders" && (
          <section>
            <h1 className="mb-5 text-2xl font-black">ประวัติการสั่งซื้อ</h1>
            {!account ? (
              <button onClick={() => go("auth")} className="rounded-lg bg-amber-400 px-6 py-3 font-bold">เข้าสู่ระบบ</button>
            ) : orders.length === 0 ? (
              <div className="rounded-xl bg-white p-12 text-center text-gray-400">ยังไม่มีประวัติการสั่งซื้อ</div>
            ) : (
              <div className="space-y-4">
                {orders.map(o => (
                  <div key={o.id} className="rounded-xl bg-white p-5">
                    <div className="flex justify-between gap-2">
                      <b>#{o.id}</b>
                      <span className="text-xs text-green-700">{o.status}</span>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">{o.date}</p>
                    <div className="my-4 space-y-2">
                      {o.items.map((item: CartItem) => {
                        const p = products.find(x => x.id === item.id);
                        return <div key={item.id} className="flex justify-between text-sm"><span>{p?.name} × {item.qty}</span></div>;
                      })}
                    </div>
                    <div className="flex justify-between border-t pt-3 font-bold">
                      <span>ยอดรวม</span><span>{money(o.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* NOTIFICATION */}
      {notice && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-[#222] px-6 py-3 text-center text-sm font-bold text-white shadow-xl">
          ✓ {notice}
        </div>
      )}
    </main>
  );
}
