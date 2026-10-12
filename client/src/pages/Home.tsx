/* IWACU OUTFITS / Monochrome Atelier: editorial storefront with tactile imagery, asymmetry, quiet motion, and saffron micro-accents. */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Instagram,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
// import iwacuLogo from 'iwacuLogo.png';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  color: string;
  isNew?: boolean;
  description: string;
  sizes: string[];
};
type BagItem = { product: Product; quantity: number; size: string };

const WHATSAPP_NUMBER = "250788000000";
const imageBase = "https://images.unsplash.com/";
const products: Product[] = [
  {
    id: 1,
    name: "Zoom Runner 01",
    category: "Shoes",
    price: 45000,
    image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg",
    color: "Ink / Bone",
    isNew: true,
    description:
      "A low-profile runner with sculpted volume, soft leather panels, and a grounded rubber sole.",
    sizes: ["39", "40", "41", "42", "43"],
  },
  {
    id: 2,
    name: "Men Suit",
    category: "Men",
    price: 150000,
    image: "https://images.pexels.com/photos/6065984/pexels-photo-6065984.jpeg",
    color: "Charcoal",
    isNew: true,
    description:
      "Relaxed tailoring cut for movement, with a soft shoulder and a dry wool hand-feel.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Millefleurs Shirt",
    category: "Men",
    price: 15000,
    image:
      "https://images.pexels.com/photos/39176732/pexels-photo-39176732.jpeg",
    color: "Bone",
    description:
      "A crisp, oversized shirt with a long line and just enough structure for the everyday edit.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 4,
    name: "Purses",
    category: "Women",
    price: 79000,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85",
    color: "Black",
    description:
      "A carry-all with considered proportions, internal pockets, and a durable cotton canvas body.",
    sizes: ["One size"],
  },
  {
    id: 5,
    name: "Sunglasses",
    category: "Accessories",
    price: 5000,
    image: "https://images.pexels.com/photos/5202051/pexels-photo-5202051.jpeg",
    color: "Stone",
    description:
      "A wide-leg trouser with utility pockets, a clean waistband, and an easy city drape.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Footbal Shirts",
    category: "Men",
    price: 18000,
    image:
      "https://images.pexels.com/photos/18256104/pexels-photo-18256104.jpeg",
    color: "Smoke",
    isNew: true,
    description:
      "Angular acetate frames that bring a little architecture to a simple look.",
    sizes: ["One size"],
  },
  {
    id: 7,
    name: "Premium T-shirts",
    category: "Men",
    price: 20000,
    image:
      "https://images.pexels.com/photos/18265937/pexels-photo-18265937.jpeg",
    color: "Oat",
    description:
      "A softly ribbed knit with a precise neckline and an understated, close-to-body fit.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 8,
    name: "Women Open shoes",
    category: "Shoes",
    price: 10000,
    image:
      "https://images.pexels.com/photos/21555668/pexels-photo-21555668.jpeg",
    color: "Saffron / Ink",
    description:
      "A clean court silhouette with a warm saffron heel tab and polished leather upper.",
    sizes: ["39", "40", "41", "42", "43"],
  },
  {
    id: 9,
    name: "Caps",
    category: "Accessories",
    price: 8000,
    image:
      "https://images.pexels.com/photos/38622783/pexels-photo-38622783.jpeg",
    color: "Black",
    description:
      "Six-panel cotton twill cap finished with a discreet tonal seam mark.",
    sizes: ["One size"],
  },
  {
    id: 10,
    name: "Men Jeans",
    category: "Men",
    price: 18000,
    image: "https://images.pexels.com/photos/6764133/pexels-photo-6764133.jpeg",
    color: "Off-white",
    description:
      "The daily uniform: dense cotton jersey, dropped shoulder, and a considered length.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 11,
    name: "Tide Slip Dress",
    category: "Women",
    price: 25000,
    image:
      "https://image.made-in-china.com/202f0j00JLZbgUKhAGqc/Spring-Summer-Women-Lady-Fashion-Floral-Sexy-Silk-Dress-Collection-Garment-Clothing-Custom-Clothes-Apparel-Design-Brand-Logo-Digital-Print-Wholesales.webp",
    color: "Ink",
    isNew: true,
    description:
      "A fluid midi dress with a quiet sheen and an easy, uninterrupted line.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 12,
    name: "Air Jordan",
    category: "Shoes",
    price: 30000,
    image:
      "https://images.pexels.com/photos/13691725/pexels-photo-13691725.jpeg",
    color: "Bone",
    description:
      "Retro proportions, modern cushioning, and a palette that works with everything.",
    sizes: ["39", "40", "41", "42", "43"],
  },
  {
    id: 13,
    name: "Luxury Shirts",
    category: "Men",
    price: 15000,
    image: "https://www.cordings.co.uk/media/wysiwyg/accessories.png",
    color: "Taupe",
    description:
      "A substantial overshirt for cool evenings, with a straight cut and clean front.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 14,
    name: "Coats",
    category: "Accessories",
    price: 48000,
    image:
      "https://i.pinimg.com/736x/9d/97/89/9d9789ac4f00b7f8b052c24b30041c18.jpg",
    color: "Rust / Bone",
    description:
      "A soft, generous scarf with a painterly check and a hand-wrapped fringe.",
    sizes: ["One size"],
  },
  {
    id: 15,
    name: "Luxury shoes",
    category: "Men",
    price: 50000,
    image:
      "https://i.pinimg.com/736x/36/ec/c8/36ecc876119f73160748c61787ffd463.jpg",
    color: "Black",
    description:
      "A sculptural tank with a clean armhole and a soft stretch finish.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 16,
    name: "Back Packs",
    category: "Accessories",
    price: 20000,
    image:
      "https://i.pinimg.com/736x/f3/fc/28/f3fc2808533f32dcd3a64165161ef819.jpg",
    color: "Graphite",
    isNew: true,
    description:
      "A compact crossbody built for the city, finished with brushed hardware.",
    sizes: ["One size"],
  },
];

const format = (n: number) => `RWF ${n.toLocaleString("en-US")}`;

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [detail, setDetail] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [bag, setBag] = useState<BagItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("iwacu-bag") || "[]");
    } catch {
      return [];
    }
  });
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    localStorage.setItem("iwacu-bag", JSON.stringify(bag));
  }, [bag]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries =>
        entries.forEach(
          e => e.isIntersecting && e.target.classList.add("is-visible")
        ),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [filter, sort]);
  useEffect(() => {
    document.body.style.overflow =
      detail || bagOpen || searchOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [detail, bagOpen, searchOpen]);

  const filtered = useMemo(() => {
    let list = products.filter(
      p =>
        (filter === "All" ||
          (filter === "New Arrivals" ? p.isNew : p.category === filter)) &&
        `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "Newest")
      list = list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    if (sort === "Price Low–High")
      list = list.sort((a, b) => a.price - b.price);
    if (sort === "High–Low") list = list.sort((a, b) => b.price - a.price);
    return list;
  }, [filter, sort, query]);
  const bagCount = bag.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = bag.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  function addToBag(product: Product, size = product.sizes[0], qty = 1) {
    setBag(current => {
      const existing = current.find(
        item => item.product.id === product.id && item.size === size
      );
      return existing
        ? current.map(item =>
            item === existing
              ? { ...item, quantity: item.quantity + qty }
              : item
          )
        : [...current, { product, quantity: qty, size }];
    });
    toast.success(`${product.name} added to your bag`);
    setBagOpen(true);
  }
  function openDetail(p: Product) {
    setDetail(p);
    setQuantity(1);
    setSelectedSize(p.sizes[0]);
  }
  function whatsapp() {
    const lines = bag
      .map(
        i =>
          `${i.product.name} — ${i.size} × ${i.quantity} = ${format(i.product.price * i.quantity)}`
      )
      .join("%0A");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello IWACU OUTFITS, I would like to place this order:\n${lines}\n\nTotal: ${format(subtotal)}`)}`,
      "_blank"
    );
  }

  return (
    <div className="site-shell">
      {/* <div className="topline">
        FREE DELIVERY IN KIGALI ON ORDERS OVER RWF 50,000 <span>·</span> WEAR
        YOUR VIBE
      </div> */}
      <header className="nav">
        <a className="brand" href="#top" aria-label="Iwacu Outfits home">
          <img src="iwacuLogo.png" alt="Iwacu Outfits" />
          <span>
            IWACU
            <br />
            <i>OUTFITS</i>
          </span>
        </a>
        <nav className="desktop-nav">
  {[
    ["Home", "#top", null],
    ["Shop", "#shop", "All"],
    ["Shoes", "#shop", "Shoes"],
    ["Clothing", "#shop", null],
    ["New Arrivals", "#shop", "New Arrivals"],
    ["About", "#about", null],
  ].map(([label, href, filterValue]) => (
    <a
      key={label as string}
      href={href as string}
      onClick={() => {
        if (filterValue) {
          setFilter(filterValue as string);
        }
      }}
    >
      {label}
    </a>
  ))}
</nav>
        <div className="nav-actions">
          <button onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search size={18} />
          </button>
          <button
            onClick={() => setBagOpen(true)}
            className="bag-trigger"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={18} />
            <b>{bagCount}</b>
          </button>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      {mobileOpen && (
        <div className="mobile-menu">
          {["Home", "Shop", "Shoes", "Clothing", "New Arrivals", "About"].map(
            label => (
              <a
                key={label}
                href={
                  label === "Home"
                    ? "#top"
                    : label === "About"
                      ? "#about"
                      : "#shop"
                }
                onClick={() => {
                  setMobileOpen(false);
                  if (label === "Shoes") setFilter("Shoes");
                  if (label === "New Arrivals") setFilter("New Arrivals");
                }}
              >
                {label}
                <ArrowUpRight size={16} />
              </a>
            )
          )}
        </div>
      )}

      <main id="top">
        <section className="hero">
          <div className="hero-image" />
          <div className="hero-shade" />
          <div className="hero-copy reveal">
            <p className="eyebrow">01 / THE NEW STANDARD</p>
            <h1>
              Wear
              <br />
              <em>your</em> vibe.
            </h1>
            <p className="hero-sub">
              An edited wardrobe for the people shaping the room.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#shop">
                Shop collection <ArrowDownRight size={17} />
              </a>
              <a className="text-link light" href="#new">
                Explore new arrivals <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="hero-caption">
            KIGALI / 2026
            <br />
            <span>THE EVERYDAY EDIT</span>
          </div>
        </section>
        
        <section className="intro section-pad reveal">
  <div className="intro-marker-wrap">
    <div className="section-marker">
      02 <span>THE EDIT</span>
    </div>
  </div>
  <div className="intro-copy">
    <p className="eyebrow">IWACU OUTFITS / RWANDA</p>
    <h2>
      Shoes for a life
      <br />
      <i>in motion.</i>
    </h2>
    <p>
      We choose pieces with a point of view. Quietly expressive, built
      to move, and made for the everyday scenes that become your story.
    </p>
    <a className="text-link" href="#about">
      Read our story <ArrowUpRight size={16} />
    </a>
  </div>
  <div className="intro-stat">
    <strong>16</strong>
    <span>
      pieces in the
      <br />
      current edit
    </span>
  </div>
</section>
        
        <section className="categories section-pad">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">03 / SHOP BY MOOD</p>
              <h2>
                Find your <i>form.</i>
              </h2>
            </div>
            <a className="text-link" href="#shop">
              View all categories <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="category-grid">
            <button
              className="category-card tall reveal"
              onClick={() => {
                setFilter("Shoes");
                document.getElementById("shop")?.scrollIntoView();
              }}
            >
              <img src="https://assets.levelshoes.com/cdn-cgi/image/width=720,height=1008,quality=85,format=webp/media/catalog/product/3/7/378040-104_1.jpg?ts=20241127032523" />
              <span>
                Shoes <ArrowUpRight size={18} />
              </span>
            </button>
            <button
              className="category-card reveal"
              onClick={() => {
                setFilter("Men");
                document.getElementById("shop")?.scrollIntoView();
              }}
            >
              <img src="https://i.pinimg.com/236x/24/53/ea/2453ea586d1179127c48e5051d04bdd9.jpg" />
              <span>
                Men's wear <ArrowUpRight size={18} />
              </span>
            </button>
            <button
              className="category-card reveal"
              onClick={() => {
                setFilter("Women");
                document.getElementById("shop")?.scrollIntoView();
              }}
            >
              <img src="https://i.pinimg.com/236x/bb/a0/91/bba091dc79c92e6a5086289c338cf308.jpg" />
              <span>
                Women's wear <ArrowUpRight size={18} />
              </span>
            </button>
            <button
              className="category-card reveal"
              onClick={() => {
                setFilter("Accessories");
                document.getElementById("shop")?.scrollIntoView();
              }}
            >
              <img src="https://i.pinimg.com/736x/b8/bc/11/b8bc11c88da1decd9985f25b3bb2c82b.jpg" />
              <span>
                Accessories <ArrowUpRight size={18} />
              </span>
            </button>
          </div>
        </section>
        
        <section className="campaign">
          <div className="campaign-copy reveal">
            <p className="eyebrow">04 / THE IWACU POINT OF VIEW</p>
            <h2>
              Less noise.
              <br />
              <i>More you.</i>
            </h2>
            <a className="button button-light" href="#shop">
              Shop the edit <ArrowDownRight size={17} />
            </a>
          </div>
          <div className="campaign-note">
            “The edit is small.
            <br />
            Your point of view is not.”
          </div>
        </section>
        
        <section className="shop section-pad" id="shop">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">05 / CURRENTLY IN STORE</p>
              <h2>
                Pieces with <i>presence.</i>
              </h2>
            </div>
            <div className="sort-wrap">
              <label htmlFor="sort">Sort by</label>
              <select
                id="sort"
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                <option>Featured</option>
                <option>Newest</option>
                <option>Price Low–High</option>
                <option>High–Low</option>
              </select>
              <ChevronDown size={15} />
            </div>
          </div>
          <div className="shop-controls">
            <div className="filters">
              {[
                "All",
                "Shoes",
                "Men",
                "Women",
                "Accessories",
                "New Arrivals",
              ].map(item => (
                <button
                  className={filter === item ? "active" : ""}
                  key={item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="product-count">{filtered.length} pieces</p>
          </div>
          <div className="product-grid">
            {filtered.map((p, i) => (
              <article
                className="product-card reveal"
                key={p.id}
                style={
                  {
                    "--delay": `${Math.min(i, 7) * 45}ms`,
                  } as React.CSSProperties
                }
              >
                <div className="product-image" onClick={() => openDetail(p)}>
                  <img src={p.image} alt={p.name} />
                  {p.isNew && <span className="new-badge">NEW</span>}
                  <button
                    className={`wish ${wishlist.includes(p.id) ? "selected" : ""}`}
                    onClick={e => {
                      e.stopPropagation();
                      setWishlist(w =>
                        w.includes(p.id)
                          ? w.filter(id => id !== p.id)
                          : [...w, p.id]
                      );
                      toast(
                        wishlist.includes(p.id)
                          ? "Removed from wishlist"
                          : "Saved to wishlist"
                      );
                    }}
                    aria-label="Wishlist"
                  >
                    <Heart
                      size={17}
                      fill={wishlist.includes(p.id) ? "currentColor" : "none"}
                    />
                  </button>
                  <button
                    className="quick-view"
                    onClick={e => {
                      e.stopPropagation();
                      openDetail(p);
                    }}
                  >
                    Quick view <ArrowUpRight size={15} />
                  </button>
                </div>
                <div className="product-meta">
                  <div>
                    <h3>{p.name}</h3>
                    <p>
                      {p.category} · {p.color}
                    </p>
                  </div>
                  <strong>{format(p.price)}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="manifesto section-pad reveal" id="about">
          <div className="section-marker">
            06 <span>WHY IWACU</span>
          </div>
          <div className="manifesto-main">
            <p className="eyebrow">A BETTER KIND OF EVERYDAY</p>
            <h2>
              We make room
              <br />
              for <i>your</i> story.
            </h2>
          </div>
          <div className="manifesto-list">
            <div>
              <span>01</span>
              <p>
                <b>Considered cuts</b>
                <br />
                Proportions that give you space to move and make the look your
                own.
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <b>Honest materials</b>
                <br />
                Touch-first fabrics and lasting details, chosen for the life
                they will live.
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <b>Made for here</b>
                <br />A Kigali point of view with a world-facing sensibility.
              </p>
            </div>
          </div>
        </section>
        <section className="newsletter">
          <div className="newsletter-copy reveal">
            <p className="eyebrow">07 / STAY IN THE LOOP</p>
            <h2>
              The good stuff,
              <br />
              <i>occasionally.</i>
            </h2>
            <p>
              New edits, studio notes, and things we are into. No noise, just a
              considered note.
            </p>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              toast.success("You’re on the list. See you soon.");
            }}
            className="newsletter-form reveal"
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              required
            />
            <button className="button button-dark">
              Sign me up <ArrowUpRight size={16} />
            </button>
          </form>
        </section>
        <section className="instagram section-pad">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">08 / @IWACUOUTFITS</p>
              <h2>
                Seen <i>in the wild.</i>
              </h2>
            </div>
            <a
              className="text-link"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              Follow along <Instagram size={16} />
            </a>
          </div>
          <div className="insta-grid">
            <img
              className="reveal"
              src="/manus-storage/iwacu-detail_64139568.jpg"
            />
            <img
              className="reveal"
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85"
            />
            <img
              className="reveal"
              src="/manus-storage/iwacu-editorial_b692f1bd.jpg"
            />
            <img
              className="reveal"
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=700&q=85"
            />
          </div>
        </section>
      </main>


     <footer>
  <div className="footer-content">
    {/* Brand / Logo */}
    <div className="footer-brand">
      <img src="iwacuLogo.png" alt="Iwacu Outfits" />
      <div>
        <strong>
          IWACU
          <br />
          <i>OUTFITS</i>
        </strong>
        <p>Wear your vibe.</p>
      </div>
    </div>

    {/* Links */}
    <div className="footer-links">
      <div>
        <span>Explore</span>
        <a href="#shop">Shop all</a>
        <a href="#shop">New arrivals</a>
        <a href="#about">Our story</a>
      </div>
      <div>
        <span>Need help?</span>
        <a href="mailto:hello@iwacuoutfits.com">Contact us</a>
        <a href="#shop">Shipping & returns</a>
        <a href="#about">Care guide</a>
      </div>
      <div>
        <span>Find us</span>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <span>© 2026 IWACU OUTFITS</span>
    <span>KIGALI, RWANDA</span>
    <span>BUILT FOR THE EVERYDAY</span>
  </div>
</footer>


      <a
        className="floating-whatsapp"
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp <ArrowUpRight size={15} />
      </a>

      {searchOpen && (
        <div className="overlay search-overlay">
          <button
            className="close-overlay"
            onClick={() => setSearchOpen(false)}
          >
            <X size={22} />
          </button>
          <p className="eyebrow">SEARCH IWACU</p>
          <input
            autoFocus
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSearchOpen(false);
              document.getElementById("shop")?.scrollIntoView();
            }}
            placeholder="What are you looking for?"
          />
          <p>Try “shoes”, “women”, or “accessories”.</p>
        </div>
      )}
      {detail && (
        <div className="overlay modal-backdrop" onClick={() => setDetail(null)}>
          <div className="detail-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setDetail(null)}>
              <X size={20} />
            </button>
            <div className="detail-image">
              <img src={detail.image} alt={detail.name} />
            </div>
            <div className="detail-copy">
              <p className="eyebrow">
                {detail.category} / {detail.color}
              </p>
              <h2>{detail.name}</h2>
              <strong className="detail-price">{format(detail.price)}</strong>
              <p className="detail-description">{detail.description}</p>
              <div className="size-picker">
                <span>Choose size</span>
                <div>
                  {detail.sizes.map(size => (
                    <button
                      key={size}
                      className={selectedSize === size ? "selected" : ""}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="detail-add">
                <div className="quantity">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  className="button button-dark"
                  onClick={() => {
                    addToBag(detail, selectedSize, quantity);
                    setDetail(null);
                  }}
                >
                  Add to bag <ShoppingBag size={16} />
                </button>
              </div>
              <p className="detail-note">
                <Sparkles size={14} /> Complimentary Kigali delivery over RWF
                150,000
              </p>
            </div>
          </div>
        </div>
      )}
      {bagOpen && (
        <div className="drawer-wrap">
          <div className="drawer-scrim" onClick={() => setBagOpen(false)} />
          <aside className="bag-drawer">
            <div className="drawer-head">
              <div>
                <p className="eyebrow">YOUR EDIT</p>
                <h2>
                  Shopping bag <span>({bagCount})</span>
                </h2>
              </div>
              <button onClick={() => setBagOpen(false)}>
                <X size={20} />
              </button>
            </div>
            {bag.length === 0 ? (
              <div className="empty-bag">
                <ShoppingBag size={30} />
                <p>
                  Your bag is waiting
                  <br />
                  for something with presence.
                </p>
                <a
                  className="button button-dark"
                  href="#shop"
                  onClick={() => setBagOpen(false)}
                >
                  Explore the edit
                </a>
              </div>
            ) : (
              <>
                <div className="bag-items">
                  {bag.map(item => (
                    <div
                      className="bag-item"
                      key={`${item.product.id}-${item.size}`}
                    >
                      <img src={item.product.image} alt="" />
                      <div className="bag-item-copy">
                        <div>
                          <h3>{item.product.name}</h3>
                          <p>
                            {item.size} · {format(item.product.price)}
                          </p>
                        </div>
                        <div className="bag-item-bottom">
                          <div className="quantity">
                            <button
                              onClick={() =>
                                setBag(b =>
                                  b.map(x =>
                                    x === item
                                      ? {
                                          ...x,
                                          quantity: Math.max(1, x.quantity - 1),
                                        }
                                      : x
                                  )
                                )
                              }
                            >
                              <Minus size={12} />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                setBag(b =>
                                  b.map(x =>
                                    x === item
                                      ? { ...x, quantity: x.quantity + 1 }
                                      : x
                                  )
                                )
                              }
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            className="remove"
                            onClick={() =>
                              setBag(b => b.filter(x => x !== item))
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bag-footer">
                  <div>
                    <span>Subtotal</span>
                    <strong>{format(subtotal)}</strong>
                  </div>
                  <p>Taxes and delivery calculated via WhatsApp.</p>
                  <button
                    className="button button-dark full"
                    onClick={whatsapp}
                  >
                    Order via WhatsApp <ArrowUpRight size={16} />
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
