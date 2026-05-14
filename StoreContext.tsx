@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Playfair Display", ui-serif, Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  --color-sage: #8F9779;
  --color-light-sage: #F4F5F1;
  --color-ash: #B2B2B2;
  --color-charcoal: #1A1A1A;
  --color-luxury-white: #FFFFFF;
}

@layer base {
  body {
    @apply bg-white text-charcoal antialiased selection:bg-sage/20 font-sans;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif tracking-tight font-bold;
  }
}

@layer components {
  .btn-primary {
    @apply bg-charcoal text-white px-8 py-4 rounded-none transition-all duration-300 hover:bg-sage active:scale-95 uppercase tracking-widest text-xs font-bold inline-block border-none cursor-pointer;
  }
  
  .btn-outline {
    @apply border border-ash text-charcoal px-8 py-4 rounded-none transition-all duration-300 hover:border-charcoal active:scale-95 uppercase tracking-widest text-xs font-bold inline-block cursor-pointer bg-transparent;
  }

  .section-padding {
    @apply py-24 px-6 md:px-12 lg:px-24;
  }

  .container-custom {
    @apply max-w-7xl mx-auto;
  }

  .card-shadow {
    @apply shadow-[20px_40px_80px_rgba(0,0,0,0.08)];
  }

  .admin-input {
    @apply w-full border-b border-gray-100 py-3 focus:outline-none focus:border-sage transition-colors text-sm bg-transparent;
  }
}
