
"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
  description: string;
  specs: string[];
  badge?: string;
};

type User = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type CartItem = {
  productId: number;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "ASUS Vivobook 15",
    category: "โน้ตบุ๊ก",
    price: 15990,
    oldPrice: 17990,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",
    description: "โน้ตบุ๊กดีไซน์สวย เหมาะสำหรับเรียนและทำงาน",
    specs: ["Intel Core i5", "RAM 8GB", "SSD 512GB", "จอ 15.6 นิ้ว Full HD"],
    badge: "ขายดี",
  },
  {
    id: 2,
    name: "Lenovo LOQ 15",
    category: "โน้ตบุ๊ก",
    price: 24990,
    oldPrice: 27990,
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700",
    description: "โน้ตบุ๊กสำหรับเล่นเกมและงานกราฟิก",
    specs: ["Intel Core i7", "RAM 16GB", "SSD 1TB", "NVIDIA Graphics"],
    badge: "ยอดนิยม",
  },
  {
    id: 3,
    name: "Acer Aspire 3",
    category: "โน้ตบุ๊ก",
    price: 12990,
    oldPrice: 14990,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",
    description: "โน้ตบุ๊กสำหรับการเรียนและใช้งานทั่วไป",
    specs: ["Intel Core i5", "RAM 8GB", "SSD 512GB", "จอ 15.6 นิ้ว"],
  },
  {
    id: 4,
    name: "MSI Thin GF63",
    category: "โน้ตบุ๊ก",
    price: 18990,
    oldPrice: 21990,
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=700",
    description: "โน้ตบุ๊กเกมมิ่งประสิทธิภาพสูง",
    specs: ["Intel Core i5", "RAM 8GB", "SSD 512GB", "Gaming Laptop"],
  },
  {
    id: 5,
    name: "PC Gaming RGB",
    category: "คอมพิวเตอร์",
    price: 22990,
    oldPrice: 25990,
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=700",
    description: "คอมพิวเตอร์ตั้งโต๊ะสำหรับเล่นเกม",
    specs: ["Intel Core i5", "RAM 16GB", "SSD 1TB", "RGB Case"],
    badge: "ขายดี",
  },
  {
    id: 6,
    name: "AOC Monitor 24",
    category: "จอคอม",
    price: 4990,
    oldPrice: 5990,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700",
    description: "จอภาพคมชัด เหมาะกับการทำงาน",
    specs: ["24 นิ้ว", "Full HD", "IPS Panel", "75Hz"],
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    category: "คีย์บอร์ด",
    price: 1290,
    oldPrice: 1590,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700",
    description: "คีย์บอร์ด Mechanical พร้อมไฟ RGB",
    specs: ["Mechanical Switch", "RGB Lighting", "USB", "Anti-Ghosting"],
  },
  {
    id: 8,
    name: "Gaming Headset",
    category: "หูฟัง",
    price: 990,
    oldPrice: 1290,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
    description: "หูฟังเสียงคมชัด พร้อมไมโครโฟน",
    specs: ["Stereo Sound", "Microphone", "Comfort Fit", "USB"],
  },
  {
    id: 9,
    name: "Wireless Gaming Mouse",
    category: "เมาส์",
    price: 790,
    oldPrice: 990,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=700",
    description: "เมาส์ไร้สายสำหรับการทำงานและเล่นเกม",
    specs: ["Wireless", "DPI Adjustable", "Rechargeable", "Ergonomic"],
  },
];

const categories = [
  { name: "โน้ตบุ๊ก", icon: "💻" },
  { name: "คอมพิวเตอร์", icon: "🖥️" },
  { name: "จอคอม", icon: "🖥" },
  { name: "คีย์บอร์ด", icon: "⌨️" },
  { name: "หูฟัง", icon: "🎧" },
  { name: "เมาส์", icon: "🖱️" },
];

const money = (n: number) =>
  "฿" + n.toLocaleString("th-TH");

export default function Page() {
  const [started, setStarted] = useState(false);
  const [exited, setExited] = useState(false);
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [category, setCategory] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [payment, setPayment] = useState("โอนเงินผ่านธนาคาร");
  const [notice, setNotice] = useState("");

  // โหลดข้อมูลที่บันทึกไว้
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pcshop-data");
      if (saved) {
        const data = JSON.parse(saved);
        setCart(data.cart || []);
        setFavorites(data.favorites || []);
        setUser(data.user || {
          name: "", email: "", phone: "", address: ""
        });
        setOrders(data.orders || []);
        setLoggedIn(data.loggedIn || false);
      }
    } catch {
      console.log("ไม่สามารถโหลดข้อมูลได้");
    }
  }, []);

  // บันทึกข้อมูลอัตโนมัติ
  useEffect(() => {
    if (!started) return;
    localStorage.setItem(
      "pcshop-data",
      JSON.stringify({
        cart,
        favorites,
        user,
        orders,
        loggedIn,
      })
    );
  }, [started, cart, favorites, user, orders, loggedIn]);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = cart.reduce((sum, item) => {
    const product = products.find(
      (p) => p.id === item.productId
    );
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCategory =
        category === "ทั้งหมด" || p.category === category;
      const matchSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);

    return result;
  }, [category, search, sort]);

  function go(name: string) {
    setPage(name);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addCart(id: number) {
    setCart((old) => {
      const found = old.find((item) => item.productId === id);
      if (found) {
        return old.map((item) =>
          item.productId === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...old, { productId: id, quantity: 1 }];
    });
    setNotice("เพิ่มสินค้าลงตะกร้าแล้ว");
    setTimeout(() => setNotice(""), 1800);
  }

  function changeQty(id: number, amount: number) {
    setCart((old) =>
      old
        .map((item) =>
          item.productId === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeCart(id: number) {
    setCart((old) => old.filter((item) => item.productId !== id));
  }

  function toggleFavorite(id: number) {
    setFavorites((old) =>
      old.includes(id)
        ? old.filter((x) => x !== id)
        : [...old, id]
    );
  }

  function openProduct(product: Product) {
    setSelected(product);
    go("detail");
  }

  function submitAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user.email || !password) {
      setNotice("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    if (authMode === "register" && !user.name) {
      setNotice("กรุณากรอกชื่อสมาชิก");
      return;
    }

    setLoggedIn(true);
    setNotice(
      authMode === "register"
        ? "สมัครสมาชิกสำเร็จ!"
        : "เข้าสู่ระบบสำเร็จ!"
    );
    setTimeout(() => {
      setNotice("");
      go("profile");
    }, 900);
  }

  function checkout() {
    if (!loggedIn) {
      setNotice("กรุณาเข้าสู่ระบบก่อนสั่งซื้อ");
      go("auth");
      return;
    }

    if (cart.length === 0) return;

    const order = {
      id: "PC" + Date.now().toString().slice(-7),
      date: new Date().toLocaleDateString("th-TH"),
      items: [...cart],
      total,
      payment,
      status: "รอการชำระเงิน",
    };

    setOrders((old) => [order, ...old]);
    setCart([]);
    setNotice("สั่งซื้อสำเร็จแล้ว!");
    go("orders");
    setTimeout(() => setNotice(""), 2500);
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100";

  const categoriesUI = (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {categories.map((item) => (
        <button
          key={item.name}
          onClick={() => {
            setCategory(item.name);
            go("products");
          }}
          className="rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm hover:-translate-y-1 hover:border-yellow-400 transition"
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <div className="text-xs font-bold">{item.name}</div>
        </button>
      ))}
    </div>
  );

  function productCard(product: Product) {
    return (
      <div
        key={product.id}
        className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition"
      >
        <div className="relative bg-gray-50 p-3">
          {product.badge && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
              {product.badge}
            </span>
          )}
          <button
            onClick={() => toggleFavorite(product.id)}
            className="absolute right-3 top-3 z-10 text-xl"
          >
            {favorites.includes(product.id) ? "❤️" : "♡"}
          </button>
          <button
            onClick={() => openProduct(product)}
            className="w-full"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-36 w-full object-contain mix-blend-multiply transition group-hover:scale-105"
            />
          </button>
        </div>
        <div className="p-3">
          <button
            onClick={() => openProduct(product)}
            className="text-left font-bold text-sm hover:text-yellow-600"
          >
            {product.name}
          </button>
          <p className="mt-1 text-xs text-gray-500">
            {product.specs.slice(0, 2).join(" | ")}
          </p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <div>
              <div className="font-black text-red-600">
                {money(product.price)}
              </div>
              <div className="text-xs text-gray-400 line-through">
                {money(product.oldPrice)}
              </div>
            </div>
            <button
              onClick={() => addCart(product.id)}
              className="rounded-full bg-yellow-400 px-3 py-2 text-xs font-bold hover:bg-yellow-500 active:scale-95 transition"
            >
              🛒 ใส่ตะกร้า
            </button>
          </div>
        </div>
      </div>
    );
  }

  // หน้าแรกก่อนเปิดแอป
  if (!started) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-100 via-white to-amber-200 p-5">
        <div className="w-full max-w-sm overflow-hidden rounded-[35px] border border-white bg-white shadow-2xl">
          <div className="relative overflow-hidden bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 px-7 py-14 text-center">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/20" />
            <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-white/20" />
            <div className="relative">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-white/60 bg-white shadow-xl">
                <span className="text-6xl">💻</span>
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-gray-900">
                PC Shop
              </h1>
              <p className="mt-2 font-medium text-gray-800">
                ครบเครื่องเรื่องคอมพิวเตอร์
              </p>
              <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gray-900/30" />
              <p className="mt-5 text-sm text-gray-800">
                เลือกซื้อสินค้าไอทีคุณภาพดี
                <br />
                ในราคาที่คุณประทับใจ
              </p>
            </div>
          </div>
          <div className="space-y-3 p-7">
            <button
              onClick={() => {
                setStarted(true);
                setExited(false);
                go("home");
              }}
              className="w-full rounded-2xl bg-yellow-400 py-4 text-lg font-black text-gray-900 shadow-lg shadow-yellow-200 hover:bg-yellow-500 active:scale-95 transition"
            >
              🚀 เปิดแอป
            </button>
            <button
              onClick={() => setExited(true)}
              className="w-full rounded-2xl border border-gray-200 py-3 font-bold text-gray-500 hover:bg-gray-50"
            >
              ยกเลิก / ออกจากแอป
            </button>
            <p className="pt-2 text-center text-xs text-gray-400">
              PC SHOP APPLICATION • VERSION 1.0
            </p>
          </div>
        </div>
        {exited && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5">
            <div className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl">
              <div className="text-5xl">👋</div>
              <h2 className="mt-4 text-xl font-black">ออกจากแอปแล้ว</h2>
              <p className="mt-2 text-sm text-gray-500">
                คุณสามารถกลับมาเปิดใช้งาน PC Shop ได้อีกครั้ง
              </p>
              <button
                onClick={() => setExited(false)}
                className="mt-6 w-full rounded-xl bg-yellow-400 py-3 font-bold"
              >
                กลับไปหน้าเปิดแอป
              </button>
            </div>
          </div>
        )}
      </main>
    );
  }

  if (exited) return null;

  return (
    <main className="min-h-screen bg-[#f7f7f5] pb-24 text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-yellow-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-xl p-2 text-2xl hover:bg-yellow-50"
            >
              ☰
            </button>
            <button
              onClick={() => go("home")}
              className="flex items-center gap-2 text-left"
            >
              <span className="text-3xl">💻</span>
              <span>
                <span className="block text-xl font-black">
                  PC Shop
                </span>
                <span className="block text-[10px] text-gray-500">
                  ครบเครื่องเรื่องคอมพิวเตอร์
                </span>
              </span>
            </button>
          </div>
          <button
            onClick={() => go("cart")}
            className="relative rounded-xl p-2 text-2xl hover:bg-yellow-50"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* SIDE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="h-full w-[290px] max-w-[85%] overflow-y-auto bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-5">
              <div className="text-xl font-black">💻 PC Shop</div>
              <button onClick={() => setMenuOpen(false)} className="text-2xl">×</button>
            </div>
            <div className="my-5 rounded-2xl bg-yellow-100 p-4">
              <div className="text-3xl">👤</div>
              <p className="mt-2 font-bold">
                {loggedIn ? user.name : "ยินดีต้อนรับ"}
              </p>
              <p className="text-xs text-gray-500">
                {loggedIn ? user.email : "เข้าสู่ระบบเพื่อใช้งาน"}
              </p>
            </div>
            {[
              ["home", "🏠", "หน้าหลัก"],
              ["products", "🛍️", "สินค้าทั้งหมด"],
              ["favorites", "❤️", "รายการโปรด"],
              ["cart", "🛒", "ตะกร้าสินค้า"],
              ["orders", "📦", "ประวัติการสั่งซื้อ"],
              ["profile", "👤", "บัญชีของฉัน"],
              ["auth", "🔐", loggedIn ? "บัญชีสมาชิก" : "เข้าสู่ระบบ / สมัครสมาชิก"],
            ].map(([key, icon, label]) => (
              <button
                key={key}
                onClick={() => go(key)}
                className="mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold hover:bg-yellow-100"
              >
                <span className="text-xl">{icon}</span>
                {label}
              </button>
            ))}
            <button
              onClick={() => {
                setStarted(false);
                setPage("home");
                setMenuOpen(false);
              }}
              className="mt-5 w-full rounded-xl border border-red-200 p-3 text-sm font-bold text-red-500"
            >
              ออกจากแอป
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-7xl px-4 py-5">
        {/* HOME */}
        {page === "home" && (
          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-950 via-gray-800 to-yellow-700 p-7 text-white shadow-xl sm:p-12">
              <div className="relative z-10 max-w-lg">
                <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black">
                  SPECIAL PROMOTION
                </span>
                <h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
                  คอมพิวเตอร์
                  <br />
                  ประสิทธิภาพสูง
                </h1>
                <p className="mt-3 text-sm text-gray-200">
                  สินค้าไอทีคุณภาพดี ราคาสุดคุ้มสำหรับคุณ
                </p>
                <button
                  onClick={() => {
                    setCategory("ทั้งหมด");
                    go("products");
                  }}
                  className="mt-6 rounded-full bg-yellow-400 px-6 py-3 font-black text-black shadow-lg hover:bg-yellow-300"
                >
                  ช้อปเลย →
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900"
                alt="Laptop promotion"
                className="absolute bottom-0 right-0 h-40 w-1/2 object-contain sm:h-64"
              />
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-black">หมวดหมู่สินค้า</h2>
                <button onClick={() => {
                  setCategory("ทั้งหมด");
                  go("products");
                }} className="text-sm font-bold text-yellow-700">
                  ดูทั้งหมด →
                </button>
              </div>
              {categoriesUI}
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-black">🔥 สินค้าขายดี</h2>
                <button
                  onClick={() => {
                    setCategory("ทั้งหมด");
                    go("products");
                  }}
                  className="text-sm font-bold text-yellow-700"
                >
                  ดูทั้งหมด →
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {products.filter(p => p.badge).map(productCard)}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-black">✨ สินค้าแนะนำ</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {products.slice(2, 6).map(productCard)}
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {page === "products" && (
          <div className="space-y-5">
            <h1 className="text-2xl font-black">สินค้าทั้งหมด</h1>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 ค้นหาสินค้า เช่น โน้ตบุ๊ก..."
              className={inputClass}
            />
            <div className="flex flex-wrap gap-2">
              {["ทั้งหมด", ...categories.map(c => c.name)].map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-4 py-2 text-xs font-bold ${
                    category === c
                      ? "bg-yellow-400 text-black"
                      : "border bg-white text-gray-600"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                พบสินค้า {filteredProducts.length} รายการ
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border bg-white px-3 py-2 text-sm"
              >
                <option value="default">เรียงตามปกติ</option>
                <option value="low">ราคาต่ำไปสูง</option>
                <option value="high">ราคาสูงไปต่ำ</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map(productCard)}
            </div>
            {filteredProducts.length === 0 && (
              <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
                ไม่พบสินค้าที่ค้นหา
              </div>
            )}
          </div>
        )}

        {/* PRODUCT DETAIL */}
        {page === "detail" && selected && (
          <div>
            <button onClick={() => go("products")} className="mb-5 font-bold">
              ← กลับไปหน้าสินค้า
            </button>
            <div className="grid gap-7 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
              <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-5">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="h-72 w-full object-contain"
                />
              </div>
              <div>
                <span className="text-sm font-bold text-yellow-700">
                  {selected.category}
                </span>
                <h1 className="mt-2 text-3xl font-black">
                  {selected.name}
                </h1>
                <div className="mt-3 text-sm text-yellow-500">★★★★★ <span className="text-gray-500">4.8 (125 รีวิว)</span></div>
                <p className="mt-4 text-sm text-gray-500">
                  {selected.description}
                </p>
                <div className="mt-5 text-3xl font-black text-red-600">
                  {money(selected.price)}
                </div>
                <p className="text-sm text-gray-400 line-through">
                  {money(selected.oldPrice)}
                </p>
                <hr className="my-5" />
                <h3 className="font-black">รายละเอียดและสเปกสินค้า</h3>
                <div className="mt-3 space-y-3">
                  {selected.specs.map((spec) => (
                    <div key={spec} className="flex gap-2 text-sm">
                      <span className="text-yellow-500">✓</span>
                      {spec}
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    onClick={() => toggleFavorite(selected.id)}
                    className="rounded-xl border px-5 py-3 font-bold"
                  >
                    {favorites.includes(selected.id) ? "❤️ ถูกใจแล้ว" : "♡ รายการโปรด"}
                  </button>
                  <button
                    onClick={() => addCart(selected.id)}
                    className="flex-1 rounded-xl bg-yellow-400 px-5 py-3 font-black hover:bg-yellow-500"
                  >
                    🛒 เพิ่มลงตะกร้า
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CART */}
        {page === "cart" && (
          <div>
            <h1 className="mb-5 text-2xl font-black">🛒 ตะกร้าสินค้า</h1>
            {cart.length === 0 ? (
              <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
                <div className="text-6xl">🛒</div>
                <h2 className="mt-4 text-xl font-black">ยังไม่มีสินค้าในตะกร้า</h2>
                <p className="mt-2 text-sm text-gray-500">เลือกสินค้าที่คุณต้องการได้เลย</p>
                <button onClick={() => go("products")} className="mt-5 rounded-xl bg-yellow-400 px-7 py-3 font-bold">
                  เลือกซื้อสินค้า
                </button>
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-3">
                <div className="space-y-3 lg:col-span-2">
                  {cart.map(item => {
                    const product = products.find(p => p.id === item.productId)!;
                    return (
                      <div key={item.productId} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                        <img src={product.image} alt={product.name} className="h-20 w-24 rounded-xl bg-gray-50 object-contain" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold">{product.name}</h3>
                          <p className="mt-1 font-black text-red-600">{money(product.price)}</p>
                          <div className="mt-2 flex items-center gap-3">
                            <button onClick={() => changeQty(product.id, -1)} className="h-8 w-8 rounded-lg bg-gray-100">−</button>
                            <span className="font-bold">{item.quantity}</span>
                            <button onClick={() => changeQty(product.id, 1)} className="h-8 w-8 rounded-lg bg-yellow-100">+</button>
                          </div>
                        </div>
                        <button onClick={() => removeCart(product.id)} className="text-xl text-red-500">🗑️</button>
                      </div>
                    );
                  })}
                </div>
                <div className="h-fit rounded-2xl bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-black">สรุปคำสั่งซื้อ</h2>
                  <div className="mt-5 flex justify-between text-sm">
                    <span>ยอดรวมสินค้า</span>
                    <span>{money(total)}</span>
                  </div>
                  <div className="mt-3 flex justify-between text-sm">
                    <span>ค่าจัดส่ง</span>
                    <span className="font-bold text-green-600">ฟรี</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-lg font-black">
                    <span>ยอดสุทธิ</span>
                    <span className="text-red-600">{money(total)}</span>
                  </div>
                  <button onClick={() => go("checkout")} className="mt-6 w-full rounded-xl bg-yellow-400 py-4 font-black hover:bg-yellow-500">
                    ดำเนินการชำระเงิน →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FAVORITES */}
        {page === "favorites" && (
          <div>
            <h1 className="mb-5 text-2xl font-black">❤️ รายการโปรด</h1>
            {favorites.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
                ยังไม่มีสินค้าที่ถูกใจ
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {products.filter(p => favorites.includes(p.id)).map(productCard)}
              </div>
            )}
          </div>
        )}

        {/* AUTH */}
        {page === "auth" && (
          <div className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow-lg sm:p-9">
            {loggedIn ? (
              <div className="text-center">
                <div className="text-6xl">👤</div>
                <h1 className="mt-4 text-2xl font-black">คุณเข้าสู่ระบบแล้ว</h1>
                <p className="mt-2 text-sm text-gray-500">{user.name}</p>
                <button onClick={() => go("profile")} className="mt-6 w-full rounded-xl bg-yellow-400 py-3 font-bold">ไปที่โปรไฟล์</button>
                <button onClick={() => {
                  setLoggedIn(false);
                  setNotice("ออกจากระบบแล้ว");
                }} className="mt-3 w-full rounded-xl border py-3 font-bold text-red-500">ออกจากระบบ</button>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <div className="text-5xl">💻</div>
                  <h1 className="mt-3 text-2xl font-black">PC Shop Member</h1>
                  <p className="mt-2 text-sm text-gray-500">สมาชิก PC Shop</p>
                </div>
                <div className="mt-6 grid grid-cols-2 rounded-xl bg-gray-100 p-1">
                  <button onClick={() => setAuthMode("login")} className={`rounded-lg py-3 text-sm font-bold ${authMode === "login" ? "bg-yellow-400 shadow" : ""}`}>เข้าสู่ระบบ</button>
                  <button onClick={() => setAuthMode("register")} className={`rounded-lg py-3 text-sm font-bold ${authMode === "register" ? "bg-yellow-400 shadow" : ""}`}>สมัครสมาชิก</button>
                </div>
                <form onSubmit={submitAuth} className="mt-6 space-y-4">
                  {authMode === "register" && (
                    <input className={inputClass} placeholder="ชื่อ - นามสกุล" value={user.name} onChange={e => setUser({...user, name:e.target.value})} />
                  )}
                  <input type="email" required className={inputClass} placeholder="อีเมล" value={user.email} onChange={e => setUser({...user, email:e.target.value})} />
                  {authMode === "register" && (
                    <input className={inputClass} placeholder="เบอร์โทรศัพท์" value={user.phone} onChange={e => setUser({...user, phone:e.target.value})} />
                  )}
                  <input type="password" required className={inputClass} placeholder="รหัสผ่าน" value={password} onChange={e => setPassword(e.target.value)} />
                  <button type="submit" className="w-full rounded-xl bg-yellow-400 py-4 font-black hover:bg-yellow-500">
                    {authMode === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
                  </button>
                </form>
                <p className="mt-5 text-center text-xs text-gray-400">
                  ระบบสมาชิกสำหรับทดลองใช้งาน Prototype
                </p>
              </>
            )}
          </div>
        )}

        {/* PROFILE */}
        {page === "profile" && (
          <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-2xl font-black">👤 บัญชีของฉัน</h1>
            {!loggedIn ? (
              <div className="py-10 text-center">
                <p className="text-gray-500">กรุณาเข้าสู่ระบบก่อนใช้งานโปรไฟล์</p>
                <button onClick={() => go("auth")} className="mt-5 rounded-xl bg-yellow-400 px-7 py-3 font-bold">เข้าสู่ระบบ</button>
              </div>
            ) : (
              <>
                <div className="my-6 flex items-center gap-4 rounded-2xl bg-yellow-50 p-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 text-3xl">👤</div>
                  <div>
                    <div className="text-lg font-black">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="mb-4 flex justify-between">
                  <h2 className="font-black">ข้อมูลส่วนตัว</h2>
                  <button onClick={() => setEditing(!editing)} className="text-sm font-bold text-yellow-700">{editing ? "ยกเลิก" : "✏️ แก้ไขข้อมูล"}</button>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold">ชื่อ - นามสกุล
                    <input disabled={!editing} className={`${inputClass} mt-2 disabled:bg-gray-50`} value={user.name} onChange={e => setUser({...user, name:e.target.value})} />
                  </label>
                  <label className="block text-sm font-bold">อีเมล
                    <input disabled={!editing} className={`${inputClass} mt-2 disabled:bg-gray-50`} value={user.email} onChange={e => setUser({...user, email:e.target.value})} />
                  </label>
                  <label className="block text-sm font-bold">เบอร์โทรศัพท์
                    <input disabled={!editing} className={`${inputClass} mt-2 disabled:bg-gray-50`} value={user.phone} onChange={e => setUser({...user, phone:e.target.value})} />
                  </label>
                  <label className="block text-sm font-bold">ที่อยู่จัดส่ง
                    <textarea disabled={!editing} className={`${inputClass} mt-2 disabled:bg-gray-50`} rows={3} value={user.address} onChange={e => setUser({...user, address:e.target.value})} />
                  </label>
                </div>
                {editing && (
                  <button onClick={() => {
                    setEditing(false);
                    setNotice("บันทึกข้อมูลโปรไฟล์แล้ว");
                    setTimeout(() => setNotice(""), 1800);
                  }} className="mt-5 w-full rounded-xl bg-yellow-400 py-3 font-black">💾 บันทึกข้อมูล</button>
                )}
                <button onClick={() => go("orders")} className="mt-3 w-full rounded-xl border p-3 font-bold">📦 ประวัติการสั่งซื้อ</button>
                <button onClick={() => {
                  setLoggedIn(false);
                  setPassword("");
                  go("home");
                }} className="mt-3 w-full rounded-xl border border-red-200 p-3 font-bold text-red-500">ออกจากระบบ</button>
              </>
            )}
          </div>
        )}

        {/* CHECKOUT */}
        {page === "checkout" && (
          <div className="mx-auto max-w-2xl space-y-5">
            <h1 className="text-2xl font-black">💳 ชำระเงิน</h1>
            {!loggedIn ? (
              <div className="rounded-2xl bg-white p-7 text-center">
                <p>กรุณาเข้าสู่ระบบก่อนชำระเงิน</p>
                <button onClick={() => go("auth")} className="mt-4 rounded-xl bg-yellow-400 px-6 py-3 font-bold">เข้าสู่ระบบ</button>
              </div>
            ) : (
              <>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <h2 className="mb-4 font-black">ข้อมูลผู้รับสินค้า</h2>
                  <p className="text-sm">ชื่อ: {user.name}</p>
                  <p className="mt-2 text-sm">เบอร์โทร: {user.phone || "ยังไม่ได้ระบุ"}</p>
                  <p className="mt-2 text-sm">ที่อยู่: {user.address || "ยังไม่ได้ระบุ"}</p>
                  <button onClick={() => go("profile")} className="mt-4 text-sm font-bold text-yellow-700">แก้ไขข้อมูลผู้รับ →</button>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <h2 className="mb-4 font-black">ช่องทางการชำระเงิน</h2>
                  {["โอนเงินผ่านธนาคาร", "บัตรเครดิต / เดบิต", "เก็บเงินปลายทาง"].map(method => (
                    <label key={method} className="mb-3 flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm">
                      <input type="radio" name="payment" checked={payment === method} onChange={() => setPayment(method)} />
                      {method}
                    </label>
                  ))}
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex justify-between font-bold">
                    <span>ยอดรวมสินค้า</span>
                    <span>{money(total)}</span>
                  </div>
                  <div className="mt-3 flex justify-between text-sm">
                    <span>ค่าจัดส่ง</span>
                    <span className="text-green-600">ฟรี</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-xl font-black">
                    <span>ยอดสุทธิ</span>
                    <span className="text-red-600">{money(total)}</span>
                  </div>
                  <button disabled={cart.length === 0} onClick={checkout} className="mt-6 w-full rounded-xl bg-yellow-400 py-4 font-black disabled:opacity-50">
                    ยืนยันคำสั่งซื้อ →
                  </button>
                  <p className="mt-3 text-center text-xs text-gray-400">การชำระเงินนี้เป็นเพียงการจำลอง Prototype</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* ORDERS */}
        {page === "orders" && (
          <div>
            <h1 className="mb-5 text-2xl font-black">📦 ประวัติการสั่งซื้อ</h1>
            {!loggedIn ? (
              <div className="rounded-2xl bg-white p-10 text-center">
                <p>กรุณาเข้าสู่ระบบเพื่อดูประวัติการสั่งซื้อ</p>
                <button onClick={() => go("auth")} className="mt-4 rounded-xl bg-yellow-400 px-6 py-3 font-bold">เข้าสู่ระบบ</button>
              </div>
            ) : orders.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
                <div className="text-5xl">📦</div>
                <p className="mt-4">ยังไม่มีประวัติการสั่งซื้อ</p>
                <button onClick={() => go("products")} className="mt-5 rounded-xl bg-yellow-400 px-6 py-3 font-bold">เลือกซื้อสินค้า</button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="rounded-2xl bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap justify-between gap-2">
                      <span className="font-black">คำสั่งซื้อ #{order.id}</span>
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold">{order.status}</span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">วันที่สั่งซื้อ: {order.date}</p>
                    <div className="my-3 space-y-2">
                      {order.items.map((item: CartItem) => {
                        const p = products.find(x => x.id === item.productId);
                        return (
                          <div key={item.productId} className="flex justify-between text-sm">
                            <span>{p?.name} × {item.quantity}</span>
                            <span>{money((p?.price || 0) * item.quantity)}</span>
                          </div>
                        );
                      })}
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between font-black">
                      <span>ยอดชำระ</span>
                      <span className="text-red-600">{money(order.total)}</span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">ช่องทางชำระเงิน: {order.payment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-2xl grid-cols-4 px-2 py-2">
          {[
            ["home", "⌂", "หน้าหลัก"],
            ["products", "▦", "หมวดหมู่"],
            ["favorites", "♡", "รายการโปรด"],
            [loggedIn ? "profile" : "auth", "♙", "บัญชีของฉัน"],
          ].map(([key, icon, label]) => (
            <button
              key={key}
              onClick={() => {
                if (key === "products") setCategory("ทั้งหมด");
                go(key);
              }}
              className={`flex flex-col items-center gap-1 rounded-xl py-1 text-xs font-bold transition ${
                page === key
                  ? "text-yellow-600"
                  : "text-gray-500"
              }`}
            >
              <span className="text-2xl">{icon}</span>
              {label}
              {page === key && <span className="h-1 w-7 rounded-full bg-yellow-400" />}
            </button>
          ))}
        </div>
      </nav>

      {/* NOTIFICATION */}
      {notice && (
        <div className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-gray-900 px-6 py-3 text-sm font-bold text-white shadow-xl">
          ✓ {notice}
        </div>
      )}
    </main>
  );
}
