import React, { useState } from 'react';
import { Product } from '../data/products';
import {
  Star,
  CheckCircle2,
  Heart,
  Camera,
  Upload,
  Sparkles,
  MessageSquarePlus,
  X,
  Send,
  Eye,
  Filter,
} from 'lucide-react';

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  avatarBg: string;
  productName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
  artworkImage?: string;
  artworkCaption?: string;
  likes: number;
}

interface ReviewShowcaseSectionProps {
  products: Product[];
  onShowToast: (msg: string) => void;
  onOpenColoringStudio: () => void;
}

export const ReviewShowcaseSection: React.FC<ReviewShowcaseSectionProps> = ({
  products,
  onShowToast,
  onOpenColoringStudio,
}) => {
  const [reviews, setReviews] = useState<CustomerReview[]>([
    {
      id: 'rev-1',
      author: 'Elena Rostova',
      location: 'Berlin, Germany',
      avatarBg: 'bg-rose-500',
      productName: 'Enchanted Flora & Sacred Mandala 300 DPI E-Book',
      rating: 5,
      date: '2 days ago',
      comment:
        'The line clarity is unmatched! Printed this on 160gsm heavy watercolor cardstock and there was ZERO pixelation or fuzzy edges. The 300 DPI vector lines hold Prismacolor wax and gouache washes so cleanly.',
      verifiedBuyer: true,
      artworkImage:
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
      artworkCaption: 'Colored with Prismacolor Premier & Faber-Castell Polychromos',
      likes: 42,
    },
    {
      id: 'rev-2',
      author: 'David Chen',
      location: 'Vancouver, Canada',
      avatarBg: 'bg-indigo-500',
      productName: 'Little Safari & Woodland Explorer: 65 Kids Book',
      rating: 5,
      date: '4 days ago',
      comment:
        'Uploaded directly to Amazon KDP for my children’s illustration paperback. It passed Amazon KDP’s interior automated check on the very first try with zero trim margin warnings. Sold over 120 copies in my first week!',
      verifiedBuyer: true,
      artworkImage:
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      artworkCaption: 'Amazon KDP Paperback Proof Copy Arrival',
      likes: 89,
    },
    {
      id: 'rev-3',
      author: 'Maya Linnea',
      location: 'Stockholm, Sweden',
      avatarBg: 'bg-emerald-500',
      productName: 'Master Watercolor Studio for Procreate & Photoshop',
      rating: 5,
      date: '1 week ago',
      comment:
        'The wet-on-wet bleed brushes and realistic paper canvas overlays literally transformed my iPad illustration workflow. People think my digital botanical paintings were done on expensive Arches 300gsm cotton paper!',
      verifiedBuyer: true,
      artworkImage:
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
      artworkCaption: 'Painted in Procreate with Master Watercolor Wet Bleed Brushes',
      likes: 67,
    },
    {
      id: 'rev-4',
      author: 'Sophia Martinez',
      location: 'Austin, Texas',
      avatarBg: 'bg-amber-500',
      productName: 'Celestial & Mystical Line Art Vector Bundle',
      rating: 5,
      date: '2 weeks ago',
      comment:
        'Used these zodiac line art and celestial vector motifs for my Etsy t-shirt and tote bag shop. The SVG paths are so clean, smooth, and easily scalable without any messy vector nodes.',
      verifiedBuyer: true,
      artworkImage:
        'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
      artworkCaption: 'Gold Foil Screenprinted Celestial Tote Bags',
      likes: 35,
    },
  ]);

  const [filterMode, setFilterMode] = useState<'all' | 'artworks' | '5stars'>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.title || '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [artworkCaption, setArtworkCaption] = useState('');

  const filteredReviews = reviews.filter((r) => {
    if (filterMode === 'artworks') return !!r.artworkImage;
    if (filterMode === '5stars') return r.rating === 5;
    return true;
  });

  const handleLike = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
    onShowToast('❤️ Thank you for liking this community showcase!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: name,
      location: location || 'Verified Artist',
      avatarBg: 'bg-rose-500',
      productName: selectedProduct,
      rating,
      date: 'Just now',
      comment,
      verifiedBuyer: true,
      artworkImage: imagePreview || undefined,
      artworkCaption: artworkCaption || (imagePreview ? 'Colored by ' + name : undefined),
      likes: 1,
    };

    setReviews([newReview, ...reviews]);
    setIsSubmitModalOpen(false);
    onShowToast('✨ Review and colored artwork submitted successfully! Thank you for sharing.');

    // Reset form
    setName('');
    setLocation('');
    setComment('');
    setImagePreview(null);
    setArtworkCaption('');
  };

  return (
    <section id="reviews" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--card-border)]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Customer Art & Reviews
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[var(--text-main)]">
            Artist Reviews & Community Showcases
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
            See how artists, colorists, and KDP authors around the world bring Pageo coloring books and digital brush assets to life.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-[var(--bg-card)] border border-[var(--card-border)] p-1 rounded-xl">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'all'
                  ? 'bg-rose-500 text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              All ({reviews.length})
            </button>
            <button
              onClick={() => setFilterMode('artworks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'artworks'
                  ? 'bg-rose-500 text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              With Artworks 🎨
            </button>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-md shadow-rose-500/20 flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <MessageSquarePlus className="w-4 h-4" /> Share Your Colored Art
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-[var(--bg-card)] border border-[var(--card-border)] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Review Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl ${rev.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-sm`}
                  >
                    {rev.author[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-heading font-bold text-sm text-[var(--text-main)]">
                        {rev.author}
                      </h4>
                      {rev.verifiedBuyer && (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[var(--text-muted)] font-mono">
                      {rev.location} • {rev.date}
                    </span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
              </div>

              {/* Product Badge */}
              <div className="inline-block text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md mb-2.5 border border-rose-500/20">
                {rev.productName}
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                "{rev.comment}"
              </p>

              {/* Uploaded Artwork Preview */}
              {rev.artworkImage && (
                <div className="rounded-2xl overflow-hidden border border-[var(--card-border)] mb-4 bg-zinc-900 group relative">
                  <img
                    src={rev.artworkImage}
                    alt={rev.artworkCaption || 'Customer artwork'}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {rev.artworkCaption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-[11px] text-white">
                      <span className="font-medium">{rev.artworkCaption}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Review Footer */}
            <div className="pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[var(--text-muted)]">
                Did this review help you?
              </span>
              <button
                onClick={() => handleLike(rev.id)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-rose-500 hover:scale-105 transition-transform font-bold text-xs"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500" /> {rev.likes} Likes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[var(--bg-card)] border border-[var(--card-border)] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[var(--card-border)] mb-5">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-rose-500" />
                <h3 className="font-heading font-black text-lg text-[var(--text-main)]">
                  Share Your Review & Colored Art
                </h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                aria-label="Close"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              {/* Rating Picker */}
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">
                  Overall Rating
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-2xl transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-bold font-mono text-[var(--text-main)]">{rating} / 5</span>
                </div>
              </div>

              {/* Product Selection */}
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">
                  Which Digital Asset Did You Use?
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.icon} {p.title} (${p.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">
                    Your Name / Artist Handle
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="E.g., Clara M."
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">
                    City, Country
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="E.g., New York, USA"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Comment Text */}
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">
                  Your Feedback / Experience
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  placeholder="How was the 300 DPI line quality, printing experience, or Procreate brush feel?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none"
                />
              </div>

              {/* Photo Upload Box */}
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">
                  Upload Photo of Your Finished Colored Page (Optional)
                </label>
                <div className="p-4 rounded-2xl border-2 border-dashed border-[var(--card-border)] hover:border-rose-400 bg-[var(--bg-card-subtle)] text-center transition-colors">
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={imagePreview}
                        alt="Upload preview"
                        className="max-h-36 mx-auto rounded-xl object-contain shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="text-[11px] text-rose-500 font-bold hover:underline"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-6 h-6 text-rose-500 mx-auto mb-1" />
                      <label className="cursor-pointer text-xs font-bold text-rose-600 hover:underline">
                        Choose photo from device
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                        JPEG, PNG, or WebP up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {imagePreview && (
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">
                    Artwork Caption / Tools Used
                  </label>
                  <input
                    type="text"
                    value={artworkCaption}
                    onChange={(e) => setArtworkCaption(e.target.value)}
                    placeholder="E.g., Colored with Caran d'Ache pencils on 200gsm cardstock"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--card-border)] text-[var(--text-main)] focus:outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-lg shadow-rose-500/25 transition-all hover:scale-[1.01]"
              >
                Submit Community Review & Artwork →
              </button>
            </form>

          </div>
        </div>
      )}
    </section>
  );
};
