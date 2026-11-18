"use client";

import { useEffect, useMemo, useState } from "react";

type Category =
  | "ทั้งหมด"
  | "โน้ตบุ๊ก"
  | "คอมพิวเตอร์"
  | "จอคอม"
  | "คีย์บอร์ด"
  | "หูฟัง"
  | "เมาส์";

type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "ทั้งหมด">;
  price: number;
  memberPrice: number;
  image: string;
  description: string;
  specs: string[];
  tag?: string;
};

type CartItem = {
  productId: number;
  quantity: number;
};

type User = {
  name: string;
  email: string;
  password: string;
  member: boolean;
};

const categories: Category[] = [
  "ทั้งหมด",
  "โน้ตบุ๊ก",
  "คอมพิวเตอร์",
  "จอคอม",
  "คีย์บอร์ด",
  "หูฟัง",
  "เมาส์",
];

const products: Product[] = [
  {
    id: 1,
    name: "AEROBOOK Pro 15",
    category: "โน้ตบุ๊ก",
    price: 32900,
    memberPrice: 29900,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    description: "โน้ตบุ๊กประสิทธิภาพสูง เหมาะสำหรับทำงานและความบันเทิง",
    specs: ["CPU Intel Core i7", "RAM 16GB", "SSD 512GB", "จอ 15.6 นิ้ว"],
    tag: "ขายดี",
  },
  {
    id: 2,
    name: "GAMING LAPTOP X16",
    category: "โน้ตบุ๊ก",
    price: 45900,
    memberPrice: 42900,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800",
    description: "โน้ตบุ๊กเกมมิ่งสำหรับเล่นเกมและงานกราฟิก",
    specs: ["CPU Intel Core i7", "RAM 16GB", "RTX Graphics", "จอ 16 นิ้ว"],
    tag: "Gaming",
  },
  {
    id: 3,
    name: "ULTRA SLIM NOTE 14",
    category: "โน้ตบุ๊ก",
    price: 25900,
    memberPrice: 23900,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
    description: "โน้ตบุ๊กบางเบาสำหรับพกพาไปทำงาน",
    specs: ["CPU Intel Core i5", "RAM 8GB", "SSD 512GB", "จอ 14 นิ้ว"],
  },
  {
    id: 4,
    name: "CREATOR BOOK 16",
    category: "โน้ตบุ๊ก",
    price: 38900,
    memberPrice: 35900,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800",
    description: "เหมาะสำหรับงานออกแบบ ตัดต่อ และสร้างสรรค์ผลงาน",
    specs: ["CPU AMD Ryzen 7", "RAM 16GB", "SSD 1TB", "จอ 16 นิ้ว"],
  },
  {
    id: 5,
    name: "OFFICE NOTE 15",
    category: "โน้ตบุ๊ก",
    price: 18900,
    memberPrice: 16900,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&sat=-30",
    description: "โน้ตบุ๊กสำหรับเรียนและทำงานทั่วไป",
    specs: ["CPU Intel Core i3", "RAM 8GB", "SSD 256GB", "จอ 15.6 นิ้ว"],
  },
  {
    id: 6,
    name: "FALCON GAMING PC",
    category: "คอมพิวเตอร์",
    price: 42900,
    memberPrice: 39900,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800",
    description: "คอมพิวเตอร์ตั้งโต๊ะสำหรับเกมเมอร์",
    specs: ["CPU Ryzen 7", "RAM 32GB", "RTX Graphics", "SSD 1TB"],
    tag: "ขายดี",
  },
  {
    id: 7,
    name: "NOVA RGB DESKTOP",
    category: "คอมพิวเตอร์",
    price: 35900,
    memberPrice: 32900,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800",
    description: "คอมพิวเตอร์ดีไซน์ RGB พร้อมใช้งาน",
    specs: ["CPU Core i5", "RAM 16GB", "SSD 1TB", "RGB Case"],
  },
  {
    id: 8,
    name: "WORKSTATION PRO",
    category: "คอมพิวเตอร์",
    price: 52900,
    memberPrice: 49900,
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800",
    description: "คอมพิวเตอร์สำหรับงานประมวลผลและงานระดับมืออาชีพ",
    specs: ["CPU Core i9", "RAM 32GB", "SSD 2TB", "Professional GPU"],
  },
  {
    id: 9,
    name: "MINI PC COMPACT",
    category: "คอมพิวเตอร์",
    price: 15900,
    memberPrice: 14500,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800",
    description: "คอมพิวเตอร์ขนาดเล็ก ประหยัดพื้นที่",
    specs: ["CPU Core i5", "RAM 16GB", "SSD 512GB", "Mini Case"],
  },
  {
    id: 10,
    name: "BLACK TITAN PC",
    category: "คอมพิวเตอร์",
    price: 64900,
    memberPrice: 61900,
    image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=800",
    description: "คอมพิวเตอร์สเปกระดับสูงสำหรับงานหนัก",
    specs: ["CPU Ryzen 9", "RAM 64GB", "RTX Graphics", "SSD 2TB"],
    tag: "Premium",
  },
  {
    id: 11,
    name: "VISION MONITOR 27",
    category: "จอคอม",
    price: 8990,
    memberPrice: 7990,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
    description: "จอมอนิเตอร์ขนาด 27 นิ้ว ภาพคมชัด",
    specs: ["27 นิ้ว", "IPS", "2K Resolution", "75Hz"],
  },
  {
    id: 12,
    name: "CURVE GAMING 32",
    category: "จอคอม",
    price: 14900,
    memberPrice: 13500,
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=800",
    description: "จอโค้งสำหรับการเล่นเกมและความบันเทิง",
    specs: ["32 นิ้ว", "Curved", "QHD", "165Hz"],
    tag: "Gaming",
  },
  {
    id: 13,
    name: "ULTRA WIDE 34",
    category: "จอคอม",
    price: 18900,
    memberPrice: 17500,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&blur=1",
    description: "จอกว้างพิเศษสำหรับทำงานหลายหน้าต่าง",
    specs: ["34 นิ้ว", "UltraWide", "UWQHD", "144Hz"],
  },
  {
    id: 14,
    name: "STUDIO DISPLAY 24",
    category: "จอคอม",
    price: 5990,
    memberPrice: 5490,
    image: "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=800",
    description: "จอภาพสำหรับทำงานทั่วไปและสำนักงาน",
    specs: ["24 นิ้ว", "IPS", "Full HD", "75Hz"],
  },
  {
    id: 15,
    name: "PRO DISPLAY 4K",
    category: "จอคอม",
    price: 21900,
    memberPrice: 19900,
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800",
    description: "จอความละเอียดสูงสำหรับงานภาพ",
    specs: ["27 นิ้ว", "4K UHD", "IPS", "Color Accurate"],
  },
  {
    id: 16,
    name: "MECHANICAL K87",
    category: "คีย์บอร์ด",
    price: 2590,
    memberPrice: 2290,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    description: "คีย์บอร์ด Mechanical ขนาดกะทัดรัด",
    specs: ["87 Keys", "Mechanical Switch", "RGB", "USB-C"],
  },
  {
    id: 17,
    name: "RGB GAMING K100",
    category: "คีย์บอร์ด",
    price: 3290,
    memberPrice: 2990,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
    description: "คีย์บอร์ดเกมมิ่งพร้อมไฟ RGB",
    specs: ["Full Size", "Mechanical", "RGB", "Anti-Ghosting"],
  },
  {
    id: 18,
    name: "MINIMAL KEY 68",
    category: "คีย์บอร์ด",
    price: 1890,
    memberPrice: 1690,
    image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=800",
    description: "คีย์บอร์ดขนาดเล็ก ดีไซน์เรียบหรู",
    specs: ["68 Keys", "Wireless", "Bluetooth", "Rechargeable"],
  },
  {
    id: 19,
    name: "OFFICE KEYBOARD",
    category: "คีย์บอร์ด",
    price: 790,
    memberPrice: 690,
    image: "https://images.unsplash.com/photo-1561112078-7d24e04c3407?w=800",
    description: "คีย์บอร์ดสำหรับใช้งานสำนักงาน",
    specs: ["Full Size", "Membrane", "USB", "Quiet Typing"],
  },
  {
    id: 20,
    name: "PRO KEYBOARD TKL",
    category: "คีย์บอร์ด",
    price: 2890,
    memberPrice: 2590,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800",
    description: "คีย์บอร์ดสำหรับผู้ใช้งานที่ต้องการความแม่นยำ",
    specs: ["TKL Layout", "Hot-Swap", "RGB", "USB-C"],
  },
  {
    id: 21,
    name: "STUDIO HEADSET X",
    category: "หูฟัง",
    price: 3990,
    memberPrice: 3590,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    description: "หูฟังครอบหูสำหรับฟังเพลงและทำงาน",
    specs: ["Over-Ear", "Wireless", "Noise Isolation", "Bluetooth"],
  },
  {
    id: 22,
    name: "GAMING HEADSET 7.1",
    category: "หูฟัง",
    price: 2590,
    memberPrice: 2290,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
    description: "หูฟังเกมมิ่งพร้อมไมโครโฟน",
    specs: ["7.1 Surround", "Microphone", "RGB", "USB"],
  },
  {
    id: 23,
    name: "WIRELESS BUDS PRO",
    category: "หูฟัง",
    price: 2190,
    memberPrice: 1990,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800",
    description: "หูฟังไร้สายขนาดเล็ก พกพาสะดวก",
    specs: ["True Wireless", "Bluetooth 5.3", "Charging Case", "Mic"],
  },
  {
    id: 24,
    name: "BASS SOUND MAX",
    category: "หูฟัง",
    price: 1790,
    memberPrice: 1590,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
    description: "หูฟังเสียงเบสแน่นสำหรับความบันเทิง",
    specs: ["Over-Ear", "Deep Bass", "Wired", "Foldable"],
  },
  {
    id: 25,
    name: "ELITE NOISE CANCEL",
    category: "หูฟัง",
    price: 5990,
    memberPrice: 5590,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800",
    description: "หูฟังตัดเสียงรบกวนสำหรับการเดินทาง",
    specs: ["Active Noise Cancel", "Wireless", "40 Hours", "Bluetooth"],
    tag: "Premium",
  },
  {
    id: 26,
    name: "PRECISION MOUSE M1",
    category: "เมาส์",
    price: 1290,
    memberPrice: 1090,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
    description: "เมาส์ไร้สายสำหรับทำงานทั่วไป",
    specs: ["Wireless", "1600 DPI", "USB Receiver", "Ergonomic"],
  },
  {
    id: 27,
    name: "RGB GAMING MOUSE",
    category: "เมาส์",
    price: 1890,
    memberPrice: 1690,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800",
    description: "เมาส์เกมมิ่งปรับ DPI ได้",
    specs: ["12000 DPI", "RGB", "Wired", "Programmable"],
    tag: "Gaming",
  },
  {
    id: 28,
    name: "ULTRA LIGHT MOUSE",
    category: "เมาส์",
    price: 2290,
    memberPrice: 2090,
    image: "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?w=800",
    description: "เมาส์น้ำหนักเบาสำหรับเกมเมอร์",
    specs: ["Lightweight", "16000 DPI", "USB-C", "RGB"],
  },
  {
    id: 29,
    name: "OFFICE MOUSE S",
    category: "เมาส์",
    price: 490,
    memberPrice: 420,
    image: "https://images.unsplash.com/photo-1586349906319-48d20e9d17c2?w=800",
    description: "เมาส์สำหรับใช้งานในสำนักงาน",
    specs: ["Optical", "1200 DPI", "USB", "3 Buttons"],
  },
  {
    id: 30,
    name: "PRO WIRELESS MOUSE",
    category: "เมาส์",
    price: 2990,
    memberPrice: 2690,
    image: "https://images.unsplash.com/photo-1625750331870-624de6fd3452?w=800",
    description: "เมาส์ไร้สายสำหรับงานและเกม",
    specs: ["Wireless", "26000 DPI", "Rechargeable", "Multi-Device"],
  },
  {
    id: 31,
    name: "ERGONOMIC MOUSE PRO",
    category: "เมาส์",
    price: 1590,
    memberPrice: 1390,
    image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=800",
    description: "เมาส์ออกแบบตามหลักสรีรศาสตร์",
    specs: ["Ergonomic", "Wireless", "Adjustable DPI", "USB-C"],
  },
  {
    id: 32,
    name: "MECHANICAL KEY MINI",
    category: "คีย์บอร์ด",
    price: 2190,
    memberPrice: 1990,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&sat=-50",
    description: "คีย์บอร์ดขนาดเล็กสำหรับโต๊ะคอมพิวเตอร์",
    specs: ["Compact Layout", "Mechanical", "RGB", "USB-C"],
  },
];

const money = (value: number) =>
  new Intl.NumberFormat("th-TH").format(value) + " บาท";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("ทั้งหมด");

  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recommended");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [message, setMessage] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("pcshop-cart");
    const savedFavorites = localStorage.getItem("pcshop-favorites");
    const savedOrders = localStorage.getItem("pcshop-orders");
    const savedUsers = localStorage.getItem("pcshop-users");
    const savedCurrentUser = localStorage.getItem("pcshop-current-user");
    const hasOpened = localStorage.getItem("pcshop-opened");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedCurrentUser) {
      const user = JSON.parse(savedCurrentUser);
      setCurrentUser(user);
      setProfileName(user.name);
    }
    if (hasOpened === "yes") setOpened(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("pcshop-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("pcshop-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("pcshop-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("pcshop-users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("pcshop-current-user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("pcshop-current-user");
    }
  }, [currentUser]);

  const isMember = currentUser?.member === true;

  const getPrice = (product: Product) =>
    isMember ? product.memberPrice : product.price;

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchCategory =
        selectedCategory === "ทั้งหมด" ||
        product.category === selectedCategory;

      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });

    if (sort === "low") {
      result = [...result].sort(
        (a, b) => getPrice(a) - getPrice(b)
      );
    } else if (sort === "high") {
      result = [...result].sort(
        (a, b) => getPrice(b) - getPrice(a)
      );
    }

    return result;
  }, [selectedCategory, search, sort, isMember]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartDetails = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as (Product & { quantity: number })[];

  const cartTotal = cartDetails.reduce(
    (sum, item) => sum + getPrice(item) * item.quantity,
    0
  );

  function navigate(target: string) {
    setPage(target);
    setMenuOpen(false);
    setCategoryOpen(false);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(productId: number) {
    setCart((old) => {
      const found = old.find((item) => item.productId === productId);
      if (found) {
        return old.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...old, { productId, quantity: 1 }];
    });
    setMessage("เพิ่มสินค้าลงตะกร้าแล้ว");
    setTimeout(() => setMessage(""), 1800);
  }

  function changeQuantity(productId: number, amount: number) {
    setCart((old) =>
      old
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleFavorite(productId: number) {
    setFavorites((old) =>
      old.includes(productId)
        ? old.filter((id) => id !== productId)
        : [...old, productId]
    );
  }

  function handleAuth() {
    if (!formEmail || !formPassword) {
      setMessage("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    if (authMode === "register") {
      if (!formName.trim()) {
        setMessage("กรุณากรอกชื่อผู้ใช้");
        return;
      }

      if (users.some((user) => user.email === formEmail)) {
        setMessage("อีเมลนี้มีบัญชีอยู่แล้ว");
        return;
      }

      const newUser: User = {
        name: formName,
        email: formEmail,
        password: formPassword,
        member: true,
      };

      setUsers((old) => [...old, newUser]);
      setCurrentUser(newUser);
      setProfileName(newUser.name);
      setMessage("สมัครสมาชิกสำเร็จ ยินดีต้อนรับสมาชิกใหม่!");
      setPage("home");
    } else {
      const found = users.find(
        (user) =>
          user.email === formEmail && user.password === formPassword
      );

      if (!found) {
        setMessage("ไม่พบบัญชีหรือรหัสผ่านไม่ถูกต้อง");
        return;
      }

      setCurrentUser(found);
      setProfileName(found.name);
      setMessage("เข้าสู่ระบบสำเร็จ");
      setPage("home");
    }

    setFormName("");
    setFormEmail("");
    setFormPassword("");
  }

  function logout() {
    setCurrentUser(null);
    setProfileName("");
    navigate("home");
    setMessage("ออกจากระบบแล้ว");
    setTimeout(() => setMessage(""), 1800);
  }

  function saveProfile() {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, name: profileName };
    setCurrentUser(updatedUser);
    setUsers((old) =>
      old.map((user) =>
        user.email === updatedUser.email ? updatedUser : user
      )
    );
    setMessage("บันทึกข้อมูลเรียบร้อย");
    setTimeout(() => setMessage(""), 1800);
  }

  function confirmOrder() {
    if (!currentUser) {
      setMessage("กรุณาเข้าสู่ระบบก่อนสั่งซื้อ");
      navigate("auth");
      return;
    }

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setMessage("กรุณากรอกชื่อ เบอร์โทรศัพท์ และที่อยู่ให้ครบ");
      return;
    }

    if (cart.length === 0) {
      setMessage("ยังไม่มีสินค้าในตะกร้า");
      return;
    }

    const order = {
      id: "PC" + Date.now().toString().slice(-8),
      date: new Date().toLocaleString("th-TH"),
      items: cartDetails,
      total: cartTotal,
      customerName,
      phone,
      address,
      status: "รอจัดส่ง",
    };

    setOrders((old) => [order, ...old]);
    setCart([]);
    setCustomerName("");
    setPhone("");
    setAddress("");
    navigate("orders");
    setMessage("สั่งซื้อสำเร็จ ขอบคุณที่ใช้บริการ");
  }

  function chooseCategory(category: Category) {
    setSelectedCategory(category);
    setCategoryOpen(false);
    setPage("products");
  }

  function openProduct(product: Product) {
    setSelectedProduct(product);
    setPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const productCard = (product: Product) => (
    <div className="product-card" key={product.id}>
      <div className="product-image-wrap">
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button
          className={`favorite-btn ${
            favorites.includes(product.id) ? "active" : ""
          }`}
          onClick={() => toggleFavorite(product.id)}
          aria-label="เพิ่มรายการโปรด"
        >
          {favorites.includes(product.id) ? "♥" : "♡"}
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>

        <div className="price-line">
          <strong>{money(getPrice(product))}</strong>
          {isMember && (
            <span className="old-price">{money(product.price)}</span>
          )}
        </div>

        {!isMember && (
          <p className="member-hint">
            ราคาสมาชิก {money(product.memberPrice)}
          </p>
        )}

        <div className="product-actions">
          <button
            className="btn-outline"
            onClick={() => openProduct(product)}
          >
            รายละเอียด
          </button>
          <button
            className="btn-gold"
            onClick={() => addToCart(product.id)}
          >
            + ใส่ตะกร้า
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main>
      {!opened ? (
        <section className="splash-screen">
          <div className="splash-glow"></div>
          <div className="splash-content">
            <div className="brand-symbol">PC</div>
            <p className="splash-small">PREMIUM COMPUTER STORE</p>
            <h1>PC <span>SHOP</span></h1>
            <p className="splash-description">
              ยกระดับประสบการณ์การใช้งานคอมพิวเตอร์ของคุณ
            </p>
            <button
              className="open-app-btn"
              onClick={() => {
                setOpened(true);
                localStorage.setItem("pcshop-opened", "yes");
              }}
            >
              เปิดแอปพลิเคชัน <span>→</span>
            </button>
          </div>
          <div className="splash-footer">TECHNOLOGY • PERFORMANCE • STYLE</div>
        </section>
      ) : (
        <>
          <header className="topbar">
            <div className="topbar-left">
              <button
                className="icon-btn hamburger"
                onClick={() => setMenuOpen(true)}
                aria-label="เปิดเมนู"
              >
                ☰
              </button>
              <button className="brand" onClick={() => navigate("home")}>
                <span className="brand-mini">PC</span>
                <span>PC <b>SHOP</b></span>
              </button>
            </div>

            <div className="topbar-search">
              <span>⌕</span>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage("products");
                }}
                placeholder="ค้นหาสินค้า..."
              />
            </div>

            <div className="topbar-actions">
              <button
                className="icon-btn"
                onClick={() => navigate("favorites")}
                title="รายการโปรด"
              >
                ♡
              </button>
              <button
                className="icon-btn cart-top"
                onClick={() => navigate("cart")}
                title="ตะกร้าสินค้า"
              >
                🛒
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </button>
              <button
                className="account-btn"
                onClick={() => navigate(currentUser ? "profile" : "auth")}
              >
                {currentUser ? currentUser.name : "เข้าสู่ระบบ"}
              </button>
            </div>
          </header>

          {menuOpen && (
            <div className="drawer-overlay" onClick={() => setMenuOpen(false)}>
              <aside className="side-drawer" onClick={(e) => e.stopPropagation()}>
                <div className="drawer-head">
                  <div className="brand">
                    <span className="brand-mini">PC</span>
                    <span>PC <b>SHOP</b></span>
                  </div>
                  <button
                    className="icon-btn"
                    onClick={() => setMenuOpen(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="drawer-user">
                  <div className="avatar">♙</div>
                  <div>
                    <strong>{currentUser ? currentUser.name : "ยินดีต้อนรับ"}</strong>
                    <p>{isMember ? "สมาชิก PC SHOP" : "ผู้ใช้งานทั่วไป"}</p>
                  </div>
                </div>

                <nav className="drawer-nav">
                  <button onClick={() => navigate("home")}>⌂ หน้าแรก</button>
                  <button onClick={() => navigate("products")}>▦ สินค้าทั้งหมด</button>
                  <button onClick={() => navigate("favorites")}>♡ รายการโปรด</button>
                  <button onClick={() => navigate("cart")}>🛒 ตะกร้าสินค้า</button>
                  <button onClick={() => navigate("orders")}>▤ ประวัติคำสั่งซื้อ</button>
                  <button onClick={() => navigate(currentUser ? "profile" : "auth")}>
                    ♙ บัญชีของฉัน
                  </button>
                </nav>

                <div className="drawer-categories">
                  <p>หมวดหมู่สินค้า</p>
                  {categories.slice(1).map((category) => (
                    <button key={category} onClick={() => {
                      chooseCategory(category);
                      setMenuOpen(false);
                    }}>
                      {category} <span>→</span>
                    </button>
                  ))}
                </div>

                {currentUser && (
                  <button className="logout-btn" onClick={logout}>
                    ออกจากระบบ
                  </button>
                )}
              </aside>
            </div>
          )}

          <div className="page-container">
            {page === "home" && (
              <>
                <section className="hero">
                  <div className="hero-content">
                    <span className="eyebrow">WELCOME TO PC SHOP</span>
                    <h1>
                      YOUR NEXT
                      <br />
                      <span>LEVEL</span> BEGINS HERE.
                    </h1>
                    <p>
                      ค้นพบอุปกรณ์คอมพิวเตอร์คุณภาพ พร้อมข้อเสนอสุดพิเศษ
                      สำหรับสมาชิก PC SHOP
                    </p>
                    <button
                      className="btn-gold hero-btn"
                      onClick={() => navigate("products")}
                    >
                      เลือกซื้อสินค้า <span>→</span>
                    </button>
                  </div>
                  <div className="hero-art">
                    <img
                      src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1000"
                      alt="Gaming computer"
                    />
                    <div className="hero-art-label">
                      <span>PC SHOP</span>
                      <strong>POWER YOUR WORLD</strong>
                    </div>
                  </div>
                </section>

                <section className="benefit-strip">
                  <div><span>✦</span><p><b>สินค้าคุณภาพ</b><small>คัดสรรอุปกรณ์ที่ได้มาตรฐาน</small></p></div>
                  <div><span>♢</span><p><b>ราคาสมาชิก</b><small>รับส่วนลดเมื่อสมัครสมาชิก</small></p></div>
                  <div><span>✓</span><p><b>สั่งซื้อง่าย</b><small>เลือกสินค้าได้ในไม่กี่ขั้นตอน</small></p></div>
                </section>

                <section className="section-block">
                  <div className="section-heading">
                    <div>
                      <span className="eyebrow">SHOP BY CATEGORY</span>
                      <h2>เลือกหมวดหมู่สินค้า</h2>
                    </div>
                    <button className="text-link" onClick={() => navigate("products")}>
                      ดูสินค้าทั้งหมด →
                    </button>
                  </div>

                  <div className="category-grid">
                    {categories.slice(1).map((category, index) => (
                      <button
                        className="category-card"
                        key={category}
                        onClick={() => chooseCategory(category)}
                      >
                        <span className="category-number">0{index + 1}</span>
                        <strong>{category}</strong>
                        <span className="category-arrow">↗</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="section-block">
                  <div className="section-heading">
                    <div>
                      <span className="eyebrow">FEATURED PRODUCTS</span>
                      <h2>สินค้าขายดี</h2>
                    </div>
                    <button className="text-link" onClick={() => navigate("products")}>
                      ดูทั้งหมด →
                    </button>
                  </div>
                  <div className="product-grid">
                    {products.filter((p) => p.tag).slice(0, 4).map(productCard)}
                  </div>
                </section>

                <section className="member-banner">
                  <div>
                    <span className="eyebrow">PC SHOP MEMBER</span>
                    <h2>พิเศษกว่า เมื่อเป็นสมาชิก</h2>
                    <p>สมัครสมาชิกวันนี้ รับราคาพิเศษสำหรับสินค้าภายในร้าน</p>
                  </div>
                  <button
                    className="btn-gold"
                    onClick={() => {
                      setAuthMode("register");
                      navigate("auth");
                    }}
                  >
                    สมัครสมาชิก →
                  </button>
                </section>
              </>
            )}

            {page === "products" && (
              <section className="section-block page-section">
                <span className="eyebrow">OUR COLLECTION</span>
                <h2>เลือกซื้อสินค้า</h2>

                <div className="filter-bar">
                  <div className="category-picker">
                    <button
                      className={`category-picker-btn ${categoryOpen ? "selected" : ""}`}
                      onClick={() => setCategoryOpen(!categoryOpen)}
                    >
                      <span>หมวดหมู่: <b>{selectedCategory}</b></span>
                      <span className="picker-arrow">{categoryOpen ? "⌃" : "⌄"}</span>
                    </button>

                    {categoryOpen && (
                      <div className="category-options">
                        {categories.map((category) => (
                          <button
                            key={category}
                            className={selectedCategory === category ? "active" : ""}
                            onClick={() => chooseCategory(category)}
                          >
                            {category}
                            {selectedCategory === category && <span>✓</span>}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <select
                    className="sort-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="recommended">เรียงตามแนะนำ</option>
                    <option value="low">ราคา: น้อยไปมาก</option>
                    <option value="high">ราคา: มากไปน้อย</option>
                  </select>
                </div>

                <p className="result-count">
                  พบสินค้า {filteredProducts.length} รายการ
                </p>

                <div className="product-grid">
                  {filteredProducts.map(productCard)}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="empty-state">
                    <span>⌕</span>
                    <h3>ไม่พบสินค้าที่ค้นหา</h3>
                    <p>ลองค้นหาด้วยคำอื่น หรือเลือกหมวดหมู่ใหม่</p>
                    <button className="btn-gold" onClick={() => {
                      setSearch("");
                      setSelectedCategory("ทั้งหมด");
                    }}>
                      แสดงสินค้าทั้งหมด
                    </button>
                  </div>
                )}
              </section>
            )}

            {page === "detail" && selectedProduct && (
              <section className="detail-layout page-section">
                <button className="back-link" onClick={() => navigate("products")}>
                  ← กลับไปหน้าสินค้า
                </button>
                <div className="detail-image">
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                </div>
                <div className="detail-info">
                  <span className="eyebrow">{selectedProduct.category}</span>
                  <h1>{selectedProduct.name}</h1>
                  <p>{selectedProduct.description}</p>
                  <div className="detail-price">{money(getPrice(selectedProduct))}</div>
                  {isMember ? (
                    <span className="member-price-note">ราคาพิเศษสำหรับสมาชิก</span>
                  ) : (
                    <span className="member-price-note">
                      ราคาสมาชิก {money(selectedProduct.memberPrice)}
                    </span>
                  )}
                  <h3>รายละเอียดสินค้า</h3>
                  <ul className="spec-list">
                    {selectedProduct.specs.map((spec) => <li key={spec}>{spec}</li>)}
                  </ul>
                  <div className="detail-buttons">
                    <button className="btn-gold" onClick={() => addToCart(selectedProduct.id)}>
                      เพิ่มลงตะกร้า
                    </button>
                    <button className="btn-outline" onClick={() => toggleFavorite(selectedProduct.id)}>
                      {favorites.includes(selectedProduct.id) ? "♥ บันทึกแล้ว" : "♡ เพิ่มรายการโปรด"}
                    </button>
                  </div>
                </div>
              </section>
            )}

            {page === "cart" && (
              <section className="page-section">
                <span className="eyebrow">YOUR SHOPPING CART</span>
                <h2>ตะกร้าสินค้า</h2>
                {cartDetails.length === 0 ? (
                  <div className="empty-state">
                    <span>🛒</span>
                    <h3>ยังไม่มีสินค้าในตะกร้า</h3>
                    <button className="btn-gold" onClick={() => navigate("products")}>
                      เลือกซื้อสินค้า
                    </button>
                  </div>
                ) : (
                  <div className="cart-layout">
                    <div className="cart-list">
                      {cartDetails.map((item) => (
                        <div className="cart-item" key={item.id}>
                          <img src={item.image} alt={item.name} />
                          <div className="cart-item-info">
                            <span>{item.category}</span>
                            <h3>{item.name}</h3>
                            <strong>{money(getPrice(item))}</strong>
                            <div className="quantity-control">
                              <button onClick={() => changeQuantity(item.id, -1)}>−</button>
                              <b>{item.quantity}</b>
                              <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                            </div>
                          </div>
                          <button className="remove-btn" onClick={() => changeQuantity(item.id, -item.quantity)}>
                            ลบ
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="cart-summary">
                      <h3>สรุปคำสั่งซื้อ</h3>
                      <div><span>จำนวนสินค้า</span><b>{cartCount} ชิ้น</b></div>
                      <div className="summary-total"><span>ยอดรวม</span><strong>{money(cartTotal)}</strong></div>
                      <button className="btn-gold full-btn" onClick={() => navigate("checkout")}>
                        ดำเนินการชำระเงิน
                      </button>
                    </div>
                  </div>
                )}
              </section>
            )}

            {page === "favorites" && (
              <section className="page-section">
                <span className="eyebrow">YOUR FAVORITES</span>
                <h2>รายการโปรด</h2>
                <div className="product-grid">
                  {products.filter((p) => favorites.includes(p.id)).map(productCard)}
                </div>
                {favorites.length === 0 && (
                  <div className="empty-state">
                    <span>♡</span>
                    <h3>ยังไม่มีรายการโปรด</h3>
                    <p>กดสัญลักษณ์หัวใจบนสินค้าเพื่อบันทึกไว้</p>
                    <button className="btn-gold" onClick={() => navigate("products")}>เลือกชมสินค้า</button>
                  </div>
                )}
              </section>
            )}

            {page === "auth" && (
              <section className="auth-wrap page-section">
                <div className="auth-card">
                  <span className="eyebrow">WELCOME TO PC SHOP</span>
                  <h2>{authMode === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}</h2>
                  <p>เข้าสู่ระบบเพื่อจัดการบัญชีและรับสิทธิพิเศษ</p>

                  <div className="auth-tabs">
                    <button className={authMode === "login" ? "active" : ""} onClick={() => {
                      setAuthMode("login");
                      setMessage("");
                    }}>เข้าสู่ระบบ</button>
                    <button className={authMode === "register" ? "active" : ""} onClick={() => {
                      setAuthMode("register");
                      setMessage("");
                    }}>สมัครสมาชิก</button>
                  </div>

                  {authMode === "register" && (
                    <label>ชื่อผู้ใช้งาน
                      <input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="กรอกชื่อของคุณ" />
                    </label>
                  )}
                  <label>อีเมล
                    <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="example@email.com" />
                  </label>
                  <label>รหัสผ่าน
                    <input type="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} placeholder="กรอกรหัสผ่าน" />
                  </label>

                  {message && <p className="form-message">{message}</p>}
                  <button className="btn-gold full-btn" onClick={handleAuth}>
                    {authMode === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
                  </button>
                  <p className="demo-note">
                    * ระบบตัวอย่างสำหรับทดลองใช้งาน ข้อมูลบัญชีเก็บไว้ในเบราว์เซอร์นี้
                  </p>
                </div>
              </section>
            )}

            {page === "profile" && (
              <section className="page-section">
                <span className="eyebrow">MY ACCOUNT</span>
                <h2>บัญชีของฉัน</h2>
                {!currentUser ? (
                  <div className="empty-state">
                    <h3>กรุณาเข้าสู่ระบบ</h3>
                    <button className="btn-gold" onClick={() => navigate("auth")}>เข้าสู่ระบบ</button>
                  </div>
                ) : (
                  <div className="profile-card">
                    <div className="profile-avatar">♙</div>
                    <h3>ข้อมูลส่วนตัว</h3>
                    <label>ชื่อผู้ใช้งาน
                      <input value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                    </label>
                    <label>อีเมล
                      <input value={currentUser.email} disabled />
                    </label>
                    <div className="account-tier">
                      {isMember ? "✦ สมาชิก PC SHOP — ได้รับราคาพิเศษ" : "ผู้ใช้งานทั่วไป"}
                    </div>
                    <button className="btn-gold full-btn" onClick={saveProfile}>บันทึกข้อมูล</button>
                    <button className="logout-btn" onClick={logout}>ออกจากระบบ</button>
                  </div>
                )}
              </section>
            )}

            {page === "checkout" && (
              <section className="page-section">
                <span className="eyebrow">CHECKOUT</span>
                <h2>ยืนยันคำสั่งซื้อ</h2>
                {!currentUser ? (
                  <div className="empty-state">
                    <h3>กรุณาเข้าสู่ระบบก่อนสั่งซื้อ</h3>
                    <button className="btn-gold" onClick={() => navigate("auth")}>เข้าสู่ระบบ</button>
                  </div>
                ) : (
                  <div className="checkout-layout">
                    <div className="checkout-form">
                      <h3>ข้อมูลผู้รับสินค้า</h3>
                      <label>ชื่อผู้รับ
                        <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="ชื่อ-นามสกุล" />
                      </label>
                      <label>เบอร์โทรศัพท์
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08X-XXX-XXXX" />
                      </label>
                      <label>ที่อยู่จัดส่ง
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="บ้านเลขที่ ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์" rows={4} />
                      </label>
                    </div>
                    <div className="cart-summary">
                      <h3>ยอดชำระ</h3>
                      {cartDetails.map((item) => (
                        <div key={item.id}><span>{item.name} × {item.quantity}</span><b>{money(getPrice(item) * item.quantity)}</b></div>
                      ))}
                      <div className="summary-total"><span>ยอดรวมทั้งสิ้น</span><strong>{money(cartTotal)}</strong></div>
                      <p className="demo-note">* เป็นการจำลองการสั่งซื้อ ไม่มีการตัดเงินจริง</p>
                      <button className="btn-gold full-btn" onClick={confirmOrder}>ยืนยันคำสั่งซื้อ</button>
                    </div>
                  </div>
                )}
              </section>
            )}

            {page === "orders" && (
              <section className="page-section">
                <span className="eyebrow">ORDER HISTORY</span>
                <h2>ประวัติคำสั่งซื้อ</h2>
                {!currentUser ? (
                  <div className="empty-state">
                    <h3>กรุณาเข้าสู่ระบบเพื่อดูคำสั่งซื้อ</h3>
                    <button className="btn-gold" onClick={() => navigate("auth")}>เข้าสู่ระบบ</button>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="empty-state">
                    <span>▤</span>
                    <h3>ยังไม่มีประวัติคำสั่งซื้อ</h3>
                    <button className="btn-gold" onClick={() => navigate("products")}>เลือกซื้อสินค้า</button>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((order) => (
                      <div className="order-card" key={order.id}>
                        <div className="order-head">
                          <div><span>หมายเลขคำสั่งซื้อ</span><strong>{order.id}</strong></div>
                          <span className="order-status">{order.status}</span>
                        </div>
                        <p>{order.date}</p>
                        {order.items.map((item: any) => (
                          <div className="order-product" key={item.id}>
                            <span>{item.name} × {item.quantity}</span>
                            <b>{money(getPrice(item) * item.quantity)}</b>
                          </div>
                        ))}
                        <div className="order-total">ยอดรวม {money(order.total)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>

          <footer className="footer">
            <div className="footer-brand">PC <b>SHOP</b></div>
            <p>PREMIUM COMPUTER & TECHNOLOGY STORE</p>
            <small>© 2026 PC SHOP. Prototype Website.</small>
          </footer>

          {message && page !== "auth" && (
            <div className="toast-message">{message}</div>
          )}
        </>
      )}
    </main>
  );
}