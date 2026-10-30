/* Mini Moguls Market Day — CREATE. SELL. LEARN. Vanilla JavaScript, no dependencies.
 *
 * Sections
 *  1. Data: categories, styles, showcases  8. Showcase page: schedule, map, booking
 *  2. Helpers                              9. Events: preparation calendar
 *  3. Art: landscapes, maps, avatars      10. Guides topic filter
 *  4. Event dates and admission           11. Forms: validation and success states
 *  5. Showcase cards                      12. Header, menu, reveal, reading progress
 *  6. Showcase finder (home page)         13. Back to top
 *  7. Showcases: filters, sort and URL
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
   * 1. Data. Mini Moguls Market Day showcase categories and stalls.
   * ------------------------------------------------------------------ */

  var REGIONS = [
    { id: 'arts-crafts', name: 'Arts & Crafts', label: 'Arts, Crafts & Design', scene: 'dunes', time: 'dusk',
      season: [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3] },
    { id: 'baking-treats', name: 'Baking & Food', label: 'Baking, Food & Treats', scene: 'mountains', time: 'dawn',
      season: [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3] },
    { id: 'tech-coding', name: 'Tech & Digital', label: 'Tech & Digital Innovation', scene: 'fjord', time: 'day',
      season: [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3] },
    { id: 'fashion-design', name: 'Fashion', label: 'Fashion & Accessories', scene: 'coast', time: 'day',
      season: [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3] },
    { id: 'games-fun', name: 'Games', label: 'Games & Interactive Fun', scene: 'fuji', time: 'dawn',
      season: [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3] },
    { id: 'green-eco', name: 'Eco & Green', label: 'Green & Sustainable Ideas', scene: 'savannah', time: 'dusk',
      season: [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3] }
  ];

  var STYLES = [
    { id: 'hiking', label: 'Hands-on Making' },
    { id: 'culture', label: 'Creative & Food' },
    { id: 'wildlife', label: 'Interactive Stalls' },
    { id: 'coast', label: 'Showcase & Demos' }
  ];

  var DURATIONS = [
    { id: 'short', label: 'Morning Session (10–1)', min: 1, max: 3 },
    { id: 'medium', label: 'Afternoon Session (1–4)', min: 4, max: 5 },
    { id: 'long', label: 'Full Day (10 AM–4 PM)', min: 6, max: 99 }
  ];

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var SEASON_LABEL = ['Planning', 'Brainstorming', 'Preparation', 'Market Day'];

  var PRICE_MIN = 1;
  var PRICE_MAX = 5;
  var PEAK_SUPPLEMENT = 0;
  var DEPOSIT = 5;
  var MAX_TRAVELLERS = 8;
  var BOOKING_CUTOFF = 1;
  var DEPARTURE_DAYS = [12];

  var INCLUDED = [
    'Opportunity to create, showcase and sell original products on Saturday, 12 December 2026 (10:00 AM–4:00 PM)',
    'Practical experience in customer interaction, communication and money awareness',
    'Age-grouped participation: Junior Moguls (5–8), Young Moguls (9–13) and Senior Moguls (14–18) — note: overall age eligibility (5–18 in concept note vs 6–18 on promotional poster) is subject to organiser confirmation',
    'Supportive, family-friendly market environment in Harare, Zimbabwe'
  ];
  var EXCLUDED = [
    'Specific Harare venue address (To be announced by the organisers)',
    'Whether stalls, tables or display equipment are provided vs brought by participants (To be confirmed)',
    'Participant registration fee, if any, and registration deadline (To be confirmed)',
    'Public entrance fee of US$5 per person is subject to final confirmation; payment methods TBA'
  ];

  var TOURS = [
    {
      id: 'handmade-crafts-art', name: 'Handmade Crafts & Visual Art', region: 'arts-crafts', country: 'Harare, Zimbabwe', style: 'hiking',
      days: 6, price: 5, single: 0, rating: 5.0, reviews: 12, group: 4, level: 'Junior, Young & Senior Moguls', badge: 'CREATE',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scene: 'dunes', time: 'dusk', featured: 1,
      summary: 'Bring ideas to life through original handmade products, custom illustrations, stationery, ceramics and decorative keepsakes.',
      highlights: ['Original art prints, cards and handmade stationery', 'Custom beaded jewellery, keyrings and woven crafts', 'Live creative demonstrations and custom orders at your table'],
      includes: ['Creative showcase opportunity in the Arts, Crafts & Design area', 'Practical experience presenting original handmade work to visitors'],
      excludes: ['Table/equipment provision & what participants need to bring (To be confirmed by organisers)'],
      stops: [[18, 70, 'Spark Idea'], [34, 52, 'Make Samples'], [52, 58, 'Price Items'], [74, 66, 'Set Up Table'], [70, 24, 'Market Day']],
      itinerary: [
        { d: '1', t: 'Spark the creative idea', x: 'Choose an original craft or design product you love making and can produce in a small batch.', stay: 'CREATE — Product Design' },
        { d: '2', t: 'Craft and package your batch', x: 'Prepare your handmade creations neatly and add simple tags or labels that tell your story.', stay: 'CREATE — Production' },
        { d: '3', t: 'Morning table setup (before 10:00 AM)', x: 'Arrive at the Harare venue, arrange your display stand and put up your stall sign and price cards.', stay: 'Market Day Morning' },
        { d: '4', t: 'Market opens (10:00 AM–1:00 PM)', x: 'Welcome visitors, explain how you made your products and make your first sales.', stay: 'SELL — Morning Showcase' },
        { d: '5', t: 'Afternoon showcase (1:00 PM–4:00 PM)', x: 'Connect with more families, take feedback from customers and practise counting change.', stay: 'LEARN — Afternoon Showcase' }
      ]
    },
    {
      id: 'stationery-paper-studio', name: 'Custom Stationery & Paper Studio', region: 'arts-crafts', country: 'Harare, Zimbabwe', style: 'culture',
      days: 6, price: 5, single: 0, rating: 5.0, reviews: 12, group: 4, level: 'Junior, Young & Senior Moguls',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scene: 'dunes', time: 'day',
      summary: 'Illustrated bookmarks, notebooks, greeting cards, stickers and paper crafts designed and packaged by young artists.',
      highlights: ['Hand-drawn bookmarks, sticker packs and notebooks', 'Custom greeting cards for birthdays and holidays', 'Learn how to bundle products into attractive gift sets'],
      includes: ['Showcase opportunity for illustrated stationery, cards and paper crafts', 'Hands-on experience in product presentation and customer interaction'],
      excludes: ['Stall setup details & participant checklists (To be confirmed by organisers)'],
      stops: [[20, 30, 'Sketch Designs'], [42, 52, 'Print & Cut'], [56, 66, 'Bundle Sets'], [66, 78, 'Display Table'], [80, 50, 'Sell & Learn']],
      itinerary: [
        { d: '1', t: 'Sketch your collection', x: 'Create a cohesive theme for your bookmarks, cards or stickers.', stay: 'CREATE — Illustration' },
        { d: '2', t: 'Package into sets', x: 'Group individual items into neat bundles with clear, simple pricing.', stay: 'CREATE — Packaging' },
        { d: '3', t: 'Market Day showcase (10:00 AM–4:00 PM)', x: 'Present your stationery studio to visitors in Harare and share the inspiration behind your artwork.', stay: 'SELL & LEARN — Harare' }
      ]
    },
    {
      id: 'young-bakers-treats', name: 'Young Bakers & Sweet Treats', region: 'baking-treats', country: 'Harare, Zimbabwe', style: 'culture',
      days: 6, price: 5, single: 0, rating: 5.0, reviews: 12, group: 4, level: 'Junior, Young & Senior Moguls', badge: 'SELL',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scene: 'mountains', time: 'dawn', featured: 2,
      summary: 'Showcase homemade biscuits, cupcakes, snacks and refreshing drinks while learning food presentation, pricing and customer service.',
      highlights: ['Homemade biscuits, brownies, cupcakes and savoury snacks', 'Neat, hygienic packaging with clear ingredient labels', 'Real-world practice in pricing, bundling and serving customers'],
      includes: ['Market-day selling experience in Baking, Food & Treats', 'Practical learning in pricing, money management and serving customers'],
      excludes: ['Table/equipment provision & food display guidelines (To be confirmed by organisers)'],
      stops: [[16, 62, 'Test Recipe'], [56, 70, 'Cost Ingredients'], [50, 50, 'Bake & Wrap'], [40, 40, 'Menu Board'], [30, 26, 'Market Day']],
      itinerary: [
        { d: '1', t: 'Choose and test your recipe', x: 'Pick a delicious treat that travels well and stays fresh throughout Market Day.', stay: 'CREATE — Recipe Testing' },
        { d: '2', t: 'Work out ingredient costs', x: 'Add up what your flour, sugar and packaging cost so you can set a price that earns a real profit.', stay: 'LEARN — Money Basics' },
        { d: '3', t: 'Bake, wrap and label', x: 'Prepare your treats cleanly and label key ingredients clearly for families.', stay: 'CREATE — Food Prep' },
        { d: '4', t: 'Serve customers (10:00 AM–4:00 PM)', x: 'Greet visitors warmly, offer combo deals and manage your cash box on Market Day.', stay: 'SELL — Harare Showcase' }
      ]
    },
    {
      id: 'drinks-snack-jars', name: 'Artisanal Drinks & Snack Jar Stall', region: 'baking-treats', country: 'Harare, Zimbabwe', style: 'coast',
      days: 3, price: 5, single: 0, rating: 5.0, reviews: 12, group: 4, level: 'Junior, Young & Senior Moguls',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scene: 'mountains', time: 'dusk',
      summary: 'Refreshing homemade lemonade, iced teas, trail mixes and gift jars packaged with creative branding by young food entrepreneurs.',
      highlights: ['Homemade cordials, lemonades and refreshing fruit drinks', 'Layered cookie-mix jars and roasted snack packs', 'Learn how branding and labels attract repeat customers'],
      includes: ['Showcase opportunity for homemade drinks, cordials and snack jars', 'Real-world practice in product branding and customer communication'],
      excludes: ['Stall equipment & what participants need to bring (To be confirmed by organisers)'],
      stops: [[18, 60, 'Blend Flavours'], [60, 70, 'Design Labels'], [46, 46, 'Pack Coolers'], [32, 30, 'Market Day']],
      itinerary: [
        { d: '1', t: 'Develop your signature product', x: 'Create a refreshing drink or snack jar that stands out for its taste and presentation.', stay: 'CREATE — Food & Drink' },
        { d: '2', t: 'Design custom labels', x: 'Give your stall a memorable name and clear price list.', stay: 'CREATE — Branding' },
        { d: '3', t: 'Market Day showcase (10:00 AM–4:00 PM)', x: 'Share your creations with Harare visitors and learn practical sales skills.', stay: 'SELL & LEARN' }
      ]
    },
    {
      id: 'tech-coding-demos', name: 'Tech, Coding & Digital Demos', region: 'tech-coding', country: 'Harare, Zimbabwe', style: 'coast',
      days: 6, price: 5, single: 0, rating: 5.0, reviews: 12, group: 4, level: 'Junior, Young & Senior Moguls', badge: 'LEARN',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scene: 'fjord', time: 'day', featured: 3,
      summary: 'Explore entrepreneurship and innovation through youth-built games, digital art, robotics projects and problem-solving inventions.',
      highlights: ['Live demonstrations of scratch games, apps or websites built by kids', 'Digital illustration prints, 3D-printed creations and tech crafts', 'Practice pitching an innovative idea clearly to visitors'],
      includes: ['Showcase opportunity for youth-built coding, digital and tech projects', 'Practice explaining ideas, problem-solving and innovation to visitors'],
      excludes: ['Power/table provision & equipment requirements (To be confirmed by organisers)'],
      stops: [[20, 70, 'Build Prototype'], [38, 50, 'Test Demo'], [52, 40, 'Prepare Pitch'], [68, 30, 'Set Up Stall'], [82, 22, 'Live Showcase']],
      itinerary: [
        { d: '1', t: 'Build and test your project', x: 'Create a digital product, simple game, invention prototype or tech-inspired craft.', stay: 'CREATE — Innovation' },
        { d: '2', t: 'Prepare a 60-second explanation', x: 'Practise explaining what problem your idea solves and how you built it.', stay: 'LEARN — Communication' },
        { d: '3', t: 'Market Day live demos (10:00 AM–4:00 PM)', x: 'Invite visitors to try your demo, purchase digital prints or gadgets, and share feedback.', stay: 'SELL & LEARN — Harare' }
      ]
    },
    {
      id: 'science-invention-kits', name: 'Young Inventors & Science Kits', region: 'tech-coding', country: 'Harare, Zimbabwe', style: 'wildlife',
      days: 4, price: 5, single: 0, rating: 5.0, reviews: 12, group: 4, level: 'Junior, Young & Senior Moguls', badge: 'INNOVATE',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scene: 'fjord', time: 'dawn',
      summary: 'DIY science experiment kits, clever everyday inventions and STEM activity packs assembled and explained by young thinkers.',
      highlights: ['Take-home mini science and craft experiment kits', 'Hands-on demonstrations at the table', 'Builds confidence in public speaking and STEM creativity'],
      includes: ['Platform to present STEM kits, prototypes and creative experiments', 'Builds confidence in communication and explaining how things work'],
      excludes: ['Table/equipment provision & participant checklist (To be confirmed by organisers)'],
      stops: [[30, 60, 'Design Kit'], [48, 40, 'Write Guide'], [70, 50, 'Pack Boxes'], [58, 74, 'Demo & Sell']],
      itinerary: [
        { d: '1', t: 'Assemble your activity kits', x: 'Put together safe, fun experiment or building kits with clear step-by-step instructions written by you.', stay: 'CREATE — STEM & Kits' },
        { d: '2', t: 'Market Day demonstrations (10:00 AM–4:00 PM)', x: 'Show visitors how the kit works live at your table and explain the science behind it.', stay: 'SELL & LEARN' }
      ]
    },
    {
      id: 'fashion-jewellery', name: 'Fashion, Jewellery & Accessories', region: 'fashion-design', country: 'Harare, Zimbabwe', style: 'hiking',
      days: 6, price: 5, single: 0, rating: 5.0, reviews: 12, group: 4, level: 'Junior, Young & Senior Moguls', badge: 'SHOWCASE',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scene: 'coast', time: 'day', featured: 4,
      summary: 'Wearable creations including beaded bracelets, hair accessories, custom tote bags and printed tees styled by young designers.',
      highlights: ['Hand-strung beadwork, friendship bracelets and earrings', 'Custom-painted tote bags, caps and fabric accessories', 'Learn visual merchandising and how to style a boutique table'],
      includes: ['Showcase opportunity for wearable creations, beadwork and accessories', 'Practical experience in visual display, pricing and customer service'],
      excludes: ['Stall/table provision & display equipment details (To be confirmed by organisers)'],
      stops: [[20, 30, 'Style Concept'], [44, 52, 'Craft Pieces'], [56, 64, 'Tag Prices'], [42, 78, 'Boutique Setup'], [70, 72, 'Market Day']],
      itinerary: [
        { d: '1', t: 'Design your accessory line', x: 'Choose colours, patterns and materials that reflect your personal style.', stay: 'CREATE — Fashion Design' },
        { d: '2', t: 'Style your table display', x: 'Use simple stands, trays and a small mirror so shoppers can try on accessories.', stay: 'CREATE — Merchandising' },
        { d: '3', t: 'Market Day showcase (10:00 AM–4:00 PM)', x: 'Help customers choose pieces, offer gift wrapping and track your best-selling designs.', stay: 'SELL & LEARN — Harare' }
      ]
    },
    {
      id: 'custom-totes-textiles', name: 'Custom Tote Bags & Textile Crafts', region: 'fashion-design', country: 'Harare, Zimbabwe', style: 'culture',
      days: 5, price: 5, single: 0, rating: 5.0, reviews: 12, group: 4, level: 'Junior, Young & Senior Moguls',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scene: 'coast', time: 'dawn',
      summary: 'Hand-printed canvas bags, fabric pouches, scrunchies and stitched accessories crafted with care by young makers.',
      highlights: ['Original stencil and block-printed tote bags', 'Handmade scrunchies, pouches and key fobs', 'Practical lessons in quality control and pricing'],
      includes: ['Showcase opportunity for custom tote bags and textile creations', 'Hands-on learning in product quality, pricing and sales'],
      excludes: ['Table/equipment provision & what to bring (To be confirmed by organisers)'],
      stops: [[18, 40, 'Pattern Idea'], [30, 58, 'Print & Sew'], [48, 72, 'Quality Check'], [64, 62, 'Price Tags'], [82, 70, 'Market Day']],
      itinerary: [
        { d: '1', t: 'Create your textile range', x: 'Print, dye or stitch durable bags and accessories that people can use every day.', stay: 'CREATE — Textiles' },
        { d: '2', t: 'Market Day showcase (10:00 AM–4:00 PM)', x: 'Share your craft process with visitors and experience running your own fashion stall.', stay: 'SELL & LEARN' }
      ]
    },
    {
      id: 'carnival-board-games', name: 'Board Games, Puzzles & Comics', region: 'games-fun', country: 'Harare, Zimbabwe', style: 'wildlife',
      days: 6, price: 5, single: 0, rating: 5.0, reviews: 12, group: 4, level: 'Junior, Young & Senior Moguls',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scene: 'fuji', time: 'dawn',
      summary: 'Original tabletop games, illustrated comic books, brain-teasers and activity packs created by young storytellers.',
      highlights: ['Kid-designed card games, board games and puzzles', 'Original comic zines, storybooks and character art', 'Interactive play-testing right at the stall'],
      includes: ['Interactive showcase opportunity for original board games, puzzles and comics', 'Builds communication, storytelling and teamwork skills'],
      excludes: ['Table/equipment provision & setup details (To be confirmed by organisers)'],
      stops: [[70, 22, 'Write Rules'], [62, 40, 'Illustrate'], [46, 70, 'Playtest'], [34, 58, 'Pack Games'], [24, 48, 'Market Day']],
      itinerary: [
        { d: '1', t: 'Invent and play-test', x: 'Write clear rules for your game or story and test it with family to make sure it is fun and easy to learn.', stay: 'CREATE — Game Design' },
        { d: '2', t: 'Produce copies for sale', x: 'Assemble complete game packs or comic issues ready for visitors to take home.', stay: 'CREATE — Production' },
        { d: '3', t: 'Market Day play & sell (10:00 AM–4:00 PM)', x: 'Invite passers-by for a two-minute demo round and turn players into happy customers.', stay: 'SELL & LEARN — Harare' }
      ]
    },
    {
      id: 'carnival-skill-games', name: 'Interactive Carnival & Skill Challenges', region: 'games-fun', country: 'Harare, Zimbabwe', style: 'wildlife',
      days: 4, price: 5, single: 0, rating: 5.0, reviews: 12, group: 4, level: 'Junior, Young & Senior Moguls', badge: 'INTERACTIVE',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scene: 'fuji', time: 'day',
      summary: 'Table-top skill games, mystery puzzle challenges and creative activity stations designed and hosted by young moguls.',
      highlights: ['Clever table-top challenges and handmade games', 'Learn how service and entertainment businesses work', 'Builds energy, confidence and customer engagement skills'],
      includes: ['Opportunity to host young-creator-designed skill challenges and games', 'Practical experience in customer engagement and money awareness'],
      excludes: ['Stall space & equipment details (To be confirmed by organisers)'],
      stops: [[82, 46, 'Game Concept'], [70, 62, 'Build Props'], [46, 22, 'Set Rules'], [38, 50, 'Host Stall'], [28, 60, 'Count Earnings']],
      itinerary: [
        { d: '1', t: 'Design a fair, fun challenge', x: 'Build a safe table-top game that visitors can play in a couple of minutes.', stay: 'CREATE — Experience Design' },
        { d: '2', t: 'Host your station on Market Day', x: 'Welcome players, explain the rules clearly and learn how an experience-based business operates.', stay: 'SELL & LEARN' }
      ]
    },
    {
      id: 'upcycled-eco-crafts', name: 'Upcycled Crafts & Eco Creations', region: 'green-eco', country: 'Harare, Zimbabwe', style: 'hiking',
      days: 6, price: 5, single: 0, rating: 5.0, reviews: 12, group: 4, level: 'Junior, Young & Senior Moguls', badge: 'ECO IDEAS',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scene: 'savannah', time: 'dusk',
      summary: 'Turning everyday recyclable materials into imaginative planters, organisers, art pieces and sustainable household products.',
      highlights: ['Decorated glass jars, tin desk organisers and upcycled decor', 'Reusable shopping bags and zero-waste lifestyle ideas', 'Shows how creativity and sustainability work hand in hand'],
      includes: ['Showcase opportunity for upcycled crafts and sustainable product ideas', 'Encourages creative problem-solving and environmental awareness'],
      excludes: ['Table/equipment provision & participant checklist (To be confirmed by organisers)'],
      stops: [[22, 70, 'Collect Materials'], [40, 54, 'Transform'], [52, 46, 'Eco Labels'], [70, 28, 'Market Day']],
      itinerary: [
        { d: '1', t: 'Reimagine everyday materials', x: 'Collect clean jars, tins, fabric offcuts or paper and transform them into useful, attractive items.', stay: 'CREATE — Upcycling' },
        { d: '2', t: 'Tell the sustainability story', x: 'Add a small card explaining what each item was made from and how it helps reduce waste.', stay: 'LEARN — Storytelling' },
        { d: '3', t: 'Market Day showcase (10:00 AM–4:00 PM)', x: 'Present your eco creations in Harare and inspire visitors with sustainable thinking.', stay: 'SELL & LEARN' }
      ]
    },
    {
      id: 'mini-plant-nursery', name: 'Mini Plant Nursery & Garden Gifts', region: 'green-eco', country: 'Harare, Zimbabwe', style: 'coast',
      days: 6, price: 5, single: 0, rating: 5.0, reviews: 12, group: 4, level: 'Junior, Young & Senior Moguls',
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scene: 'savannah', time: 'day',
      summary: 'Potted succulents, kitchen herbs, hand-painted flowerpots and seed bombs grown and nurtured by young green entrepreneurs.',
      highlights: ['Home-grown succulents, seedlings and kitchen herbs', 'Hand-painted terracotta pots and care instruction cards', 'Teaches patience, care and sustainable product value'],
      includes: ['Showcase opportunity for potted seedlings, herbs and garden crafts', 'Practical experience in caring for, pricing and presenting products'],
      excludes: ['Table/equipment provision & setup requirements (To be confirmed by organisers)'],
      stops: [[24, 30, 'Pot Cuttings'], [34, 50, 'Paint Pots'], [48, 62, 'Care Cards'], [76, 74, 'Display Trays'], [86, 60, 'Market Day']],
      itinerary: [
        { d: '1', t: 'Propagate and paint', x: 'Pot hardy succulents or herbs well ahead of December and decorate the containers.', stay: 'CREATE — Growing' },
        { d: '2', t: 'Write plant care tags', x: 'Include a helpful note on sunlight and watering so customers can keep their plant thriving.', stay: 'LEARN — Customer Care' },
        { d: '3', t: 'Market Day showcase (10:00 AM–4:00 PM)', x: 'Bring greenery to the Harare market floor and share your love of nature with customers.', stay: 'SELL & LEARN' }
      ]
    }
  ];

  /* ------------------------------------------------------------------
   * 2. Helpers
   * ------------------------------------------------------------------ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function money(n) { return 'US$' + Math.round(n).toLocaleString('en-US'); }
  function byId(list, id) { return list.filter(function (x) { return x.id === id; })[0] || null; }
  function findTour(id) { return byId(TOURS, String(id || '').toLowerCase()); }
  function findRegion(id) { return byId(REGIONS, String(id || '').toLowerCase()); }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  function durationOf(days) { return DURATIONS.filter(function (d) { return days >= d.min && days <= d.max; })[0]; }
  function styleLabel(id) { var s = byId(STYLES, id); return s ? s.label : ''; }
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Dates are ISO strings (YYYY-MM-DD) handled in UTC, so they never drift with time zones.
  function toISO(d) { return d.toISOString().slice(0, 10); }
  function parseISO(s) {
    if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
    var p = s.split('-').map(Number);
    var d = new Date(Date.UTC(p[0], p[1] - 1, p[2]));
    return d.getUTCMonth() === p[1] - 1 ? d : null;
  }
  function todayUTC() { var n = new Date(); return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())); }
  function addDays(d, n) { var c = new Date(d.getTime()); c.setUTCDate(c.getUTCDate() + n); return c; }
  var fmtShort = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
  var fmtLong = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

  // A small, stable hash so demo availability is the same on every visit.
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  var toastEl = $('#toast');
  var toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 2800);
  }

  var STAR = '<svg viewBox="0 0 20 20" class="h-4 w-4 fill-current" aria-hidden="true"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z"/></svg>';
  function stars(rating) {
    var out = '';
    for (var i = 1; i <= 5; i++) out += i <= Math.round(rating) ? STAR : STAR.replace('fill-current', 'fill-current opacity-25');
    return '<span class="inline-flex text-sun-deep" role="img" aria-label="Rated ' + rating + ' out of 5">' + out + '</span>';
  }

  /* ------------------------------------------------------------------
   * 3. Art: 16 Distinct Editorial Illustrations for Mini Moguls Market Day.
   *    Every illustration shares the same unified brand language:
   *      - Sunshine Gold (#F4C84A), Ink Black (#111111), White (#FFFFFF),
   *        Warm Cream (#FFF9EB) and Sand (#F4E6CC).
   *      - Consistent 4px-4.5px #111111 editorial ink outlines & character design.
   *      - Distinct compositions, camera angles and silhouettes per (scene, time)
   *        so adjacent cards never repeat the same layout.
   * ------------------------------------------------------------------ */
  var SKIES = {
    dawn:  { top: '#FFF9EB', bottom: '#F4E6CC', sun: '#F4C84A', glow: '#F4C84A' },
    day:   { top: '#FFFDF7', bottom: '#FFF3C4', sun: '#F4C84A', glow: '#F4C84A' },
    dusk:  { top: '#F4E6CC', bottom: '#FFF9EB', sun: '#F4C84A', glow: '#F4C84A' },
    night: { top: '#FFF3C4', bottom: '#F4E6CC', sun: '#F4C84A', glow: '#FFFFFF' }
  };

  var LAYERS = {
    dunes:     { dawn: ['#F4E6CC', '#ECD5AD', '#F4C84A', '#111111'], day: ['#FFF3C4', '#F4E6CC', '#F4C84A', '#111111'],
                 dusk: ['#ECD5AD', '#F4E6CC', '#F4C84A', '#111111'], night: ['#FFF3C4', '#F4E6CC', '#F4C84A', '#111111'] },
    mountains: { dawn: ['#F4E6CC', '#ECD5AD', '#F4C84A', '#111111'], day: ['#FFF3C4', '#F4E6CC', '#F4C84A', '#111111'],
                 dusk: ['#ECD5AD', '#F4E6CC', '#F4C84A', '#111111'], night: ['#FFF3C4', '#F4E6CC', '#F4C84A', '#111111'] },
    fjord:     { dawn: ['#F4E6CC', '#ECD5AD', '#F4C84A', '#111111'], day: ['#FFF3C4', '#F4E6CC', '#F4C84A', '#111111'],
                 dusk: ['#ECD5AD', '#F4E6CC', '#F4C84A', '#111111'], night: ['#FFF3C4', '#F4E6CC', '#F4C84A', '#111111'] },
    coast:     { dawn: ['#F4E6CC', '#ECD5AD', '#F4C84A', '#111111'], day: ['#FFF3C4', '#F4E6CC', '#F4C84A', '#111111'],
                 dusk: ['#ECD5AD', '#F4E6CC', '#F4C84A', '#111111'], night: ['#FFF3C4', '#F4E6CC', '#F4C84A', '#111111'] },
    fuji:      { dawn: ['#F4E6CC', '#ECD5AD', '#F4C84A', '#111111'], day: ['#FFF3C4', '#F4E6CC', '#F4C84A', '#111111'],
                 dusk: ['#ECD5AD', '#F4E6CC', '#F4C84A', '#111111'], night: ['#FFF3C4', '#F4E6CC', '#F4C84A', '#111111'] },
    savannah:  { dawn: ['#F4E6CC', '#ECD5AD', '#F4C84A', '#111111'], day: ['#FFF3C4', '#F4E6CC', '#F4C84A', '#111111'],
                 dusk: ['#ECD5AD', '#F4E6CC', '#F4C84A', '#111111'], night: ['#FFF3C4', '#F4E6CC', '#F4C84A', '#111111'] }
  };
  var artCount = 0;

  function skyDefs(id, sky) {
    return '<defs>' +
      '<linearGradient id="' + id + 's" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + sky.top + '"/><stop offset="1" stop-color="' + sky.bottom + '"/></linearGradient>' +
      '<radialGradient id="' + id + 'g"><stop offset="0" stop-color="' + sky.glow + '" stop-opacity=".45"/><stop offset="1" stop-color="' + sky.glow + '" stop-opacity="0"/></radialGradient>' +
      '<pattern id="' + id + 'p" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="18" cy="18" r="2" fill="#111111" opacity=".055"/></pattern>' +
      '</defs>' +
      '<rect x="-1800" y="-1200" width="4800" height="3200" fill="url(#' + id + 's)"/>' +
      '<rect x="-1800" y="-1200" width="4800" height="3200" fill="url(#' + id + 'p)"/>';
  }

  function spk(x, y, s, fill) {
    fill = fill || '#F4C84A';
    return '<path transform="translate(' + x + ' ' + y + ') scale(' + s + ')" d="M0-22C3-7 7-3 22 0C7 3 3 7 0 22C-3 7-7 3-22 0C-7-3-3-7 0-22Z" fill="' + fill + '" stroke="#111111" stroke-width="3" stroke-linejoin="round"/>';
  }

  function bunting(x1, y1, cx, cy, x2, y2, count) {
    count = count || 11;
    var out = '<path d="M' + x1 + ' ' + y1 + ' Q' + cx + ' ' + cy + ' ' + x2 + ' ' + y2 + '" fill="none" stroke="#111111" stroke-width="4" stroke-linecap="round"/>';
    for (var i = 0; i < count; i++) {
      var t = (i + 0.5) / count;
      var x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
      var y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
      var fill = i % 3 === 0 ? '#F4C84A' : (i % 3 === 1 ? '#FFFFFF' : '#111111');
      out += '<path d="M' + (x - 20) + ' ' + (y - 2) + 'L' + x + ' ' + (y + 34) + 'L' + (x + 20) + ' ' + (y - 2) + 'Z" fill="' + fill + '" stroke="#111111" stroke-width="3.5" stroke-linejoin="round"/>';
    }
    return out;
  }

  function floorPlane(y, fill) {
    y = y || 635;
    fill = fill || '#F4E6CC';
    return '<rect x="-1800" y="' + y + '" width="4800" height="' + (2200 - y) + '" fill="' + fill + '"/>' +
      '<path d="M-1800 ' + y + 'H3000" stroke="#111111" stroke-width="6"/>' +
      '<path d="M90 ' + (y + 45) + 'H380M540 ' + (y + 70) + 'H880M940 ' + (y + 40) + 'H1130" stroke="#111111" stroke-width="3" stroke-linecap="round" opacity=".22"/>';
  }

  function pillBadge(x, y, text, dark) {
    var w = text.length * 13 + 48;
    var bg = dark ? '#111111' : '#F4C84A';
    var fg = dark ? '#F4C84A' : '#111111';
    return '<g transform="translate(' + x + ' ' + y + ')">' +
      '<rect x="' + (-w / 2 + 4) + '" y="-20" width="' + w + '" height="44" rx="22" fill="#111111"/>' +
      '<rect x="' + (-w / 2) + '" y="-24" width="' + w + '" height="44" rx="22" fill="' + bg + '" stroke="#111111" stroke-width="4"/>' +
      '<text y="4" text-anchor="middle" font-family="Outfit, sans-serif" font-size="18" font-weight="800" letter-spacing="2.5" fill="' + fg + '">' + text + '</text>' +
      '</g>';
  }

  // Editorial character generator: confident young entrepreneur / creator
  function mogulKid(x, y, opts) {
    opts = opts || {};
    var s = opts.scale || 1;
    var skin = opts.skin || '#8D5524';
    var shirt = opts.shirt || '#F4C84A';
    var apron = opts.apron !== undefined ? opts.apron : '#FFFFFF';
    var hair = opts.hair || 'puffs'; // puffs, curly, cap, locs, short
    var armL = opts.armL || 'down';  // down, wave, out
    var armR = opts.armR || 'up';    // down, up, out
    var legs = opts.legs || false;
    var out = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">';
    if (legs) {
      out += '<rect x="-26" y="42" width="18" height="75" rx="8" fill="#111111"/>' +
             '<rect x="8" y="42" width="18" height="75" rx="8" fill="#111111"/>' +
             '<path d="M-34 112 H-4 C-4 100 -34 100 -34 112 Z M4 112 H34 C34 100 4 100 4 112 Z" fill="#F4C84A" stroke="#111111" stroke-width="4"/>';
    }
    if (hair === 'puffs') {
      out += '<circle cx="-34" cy="-126" r="22" fill="#111111"/><circle cx="34" cy="-126" r="22" fill="#111111"/>' +
             '<circle cx="-26" cy="-122" r="7" fill="#F4C84A"/><circle cx="26" cy="-122" r="7" fill="#F4C84A"/>';
    } else if (hair === 'curly') {
      out += '<path d="M-38-100C-46-128-24-148 0-148C24-148 46-128 38-100Z" fill="#111111"/>' +
             '<circle cx="-28" cy="-126" r="14" fill="#111111"/><circle cx="0" cy="-136" r="16" fill="#111111"/><circle cx="28" cy="-126" r="14" fill="#111111"/>';
    } else if (hair === 'locs') {
      out += '<path d="M-36-96C-42-130-22-146 0-146C22-146 42-130 36-96" fill="#111111"/>' +
             '<rect x="-40" y="-110" width="12" height="48" rx="6" fill="#111111"/><rect x="28" y="-110" width="12" height="48" rx="6" fill="#111111"/>';
    }
    // Left arm
    if (armL === 'wave') {
      out += '<path d="M-38-36 C-68-52 -78-84 -66-108" fill="none" stroke="#111111" stroke-width="24" stroke-linecap="round"/>' +
             '<path d="M-38-36 C-68-52 -78-84 -66-108" fill="none" stroke="' + skin + '" stroke-width="15" stroke-linecap="round"/>' +
             '<circle cx="-66" cy="-110" r="10" fill="' + skin + '" stroke="#111111" stroke-width="4"/>';
    } else if (armL === 'out') {
      out += '<path d="M-38-36 C-68-30 -86-14 -96-4" fill="none" stroke="#111111" stroke-width="24" stroke-linecap="round"/>' +
             '<path d="M-38-36 C-68-30 -86-14 -96-4" fill="none" stroke="' + skin + '" stroke-width="15" stroke-linecap="round"/>' +
             '<circle cx="-98" cy="-4" r="10" fill="' + skin + '" stroke="#111111" stroke-width="4"/>';
    } else {
      out += '<path d="M-38-36 C-60-16 -64 10 -52 30" fill="none" stroke="#111111" stroke-width="24" stroke-linecap="round"/>' +
             '<path d="M-38-36 C-60-16 -64 10 -52 30" fill="none" stroke="' + skin + '" stroke-width="15" stroke-linecap="round"/>';
    }
    // Right arm
    if (armR === 'up') {
      out += '<path d="M38-36 C68-52 78-84 66-108" fill="none" stroke="#111111" stroke-width="24" stroke-linecap="round"/>' +
             '<path d="M38-36 C68-52 78-84 66-108" fill="none" stroke="' + skin + '" stroke-width="15" stroke-linecap="round"/>' +
             '<circle cx="66" cy="-110" r="10" fill="' + skin + '" stroke="#111111" stroke-width="4"/>';
    } else if (armR === 'out') {
      out += '<path d="M38-36 C68-30 86-14 96-4" fill="none" stroke="#111111" stroke-width="24" stroke-linecap="round"/>' +
             '<path d="M38-36 C68-30 86-14 96-4" fill="none" stroke="' + skin + '" stroke-width="15" stroke-linecap="round"/>' +
             '<circle cx="98" cy="-4" r="10" fill="' + skin + '" stroke="#111111" stroke-width="4"/>';
    } else {
      out += '<path d="M38-36 C60-16 64 10 52 30" fill="none" stroke="#111111" stroke-width="24" stroke-linecap="round"/>' +
             '<path d="M38-36 C60-16 64 10 52 30" fill="none" stroke="' + skin + '" stroke-width="15" stroke-linecap="round"/>';
    }
    // Torso
    out += '<path d="M-46 50 L-38-38 C-36-52 -20-60 0-60 C20-60 36-52 38-38 L46 50 Z" fill="' + shirt + '" stroke="#111111" stroke-width="4.5" stroke-linejoin="round"/>';
    if (apron) {
      out += '<path d="M-28 50 L-24-30 H24 L28 50 Z" fill="' + apron + '" stroke="#111111" stroke-width="4" stroke-linejoin="round"/>' +
             '<path d="M-18-30 V-56 M18-30 V-56" stroke="#111111" stroke-width="4"/>' +
             '<rect x="-16" y="-8" width="32" height="24" rx="5" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>';
    }
    // Head
    out += '<rect x="-11" y="-76" width="22" height="22" rx="6" fill="' + skin + '" stroke="#111111" stroke-width="4"/>' +
           '<circle cx="-34" cy="-96" r="8" fill="' + skin + '" stroke="#111111" stroke-width="4"/>' +
           '<circle cx="34" cy="-96" r="8" fill="' + skin + '" stroke="#111111" stroke-width="4"/>' +
           '<ellipse cx="0" cy="-98" rx="34" ry="38" fill="' + skin + '" stroke="#111111" stroke-width="4.5"/>';
    if (hair === 'cap') {
      out += '<path d="M-34-106 C-34-134 34-134 34-106 Z" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
             '<path d="M-36-106 H48 C48-114 34-116 16-114 H-36 Z" fill="#111111"/>';
    } else {
      out += '<path d="M-33-104 C-26-128 26-128 33-104 C20-116 -20-116 -33-104 Z" fill="#111111"/>';
    }
    out += '<circle cx="-13" cy="-98" r="4" fill="#111111"/><circle cx="13" cy="-98" r="4" fill="#111111"/>' +
           '<circle cx="-11.5" cy="-99.5" r="1.3" fill="#FFFFFF"/><circle cx="14.5" cy="-99.5" r="1.3" fill="#FFFFFF"/>' +
           '<path d="M-18-108 Q-13-112 -8-108 M8-108 Q13-112 18-108" fill="none" stroke="#111111" stroke-width="3" stroke-linecap="round"/>' +
           '<path d="M-11-82 Q0-72 11-82" fill="none" stroke="#111111" stroke-width="3.5" stroke-linecap="round"/>' +
           '<ellipse cx="-20" cy="-88" rx="5" ry="3" fill="#F4C84A" opacity=".55"/><ellipse cx="20" cy="-88" rx="5" ry="3" fill="#F4C84A" opacity=".55"/>';
    out += '</g>';
    return out;
  }

  var SCENES = {
    // =========================================================================
    // 1. DUNES: ARTS, CRAFTS & DESIGN
    //    - dusk: Festive Market Stall + Customer Interaction (Hero Arch & Category 1)
    //    - day/dawn/night: Young Artist Studio, Giant Easel, Palette & Pottery Workshop
    // =========================================================================
    dunes: function (id, sky, c, time) {
      if (time === 'night') {
        // REGISTRATION & WELCOME DESK ("READY TO UNLEASH A LITTLE MOGUL?")
        return '<circle cx="960" cy="200" r="125" fill="#F4C84A" opacity=".35"/>' +
          floorPlane(640, '#F4E6CC') +
          bunting(50, 75, 600, 135, 1150, 75, 11) +
          // Welcome & Registration Arch
          '<rect x="140" y="165" width="480" height="475" rx="20" fill="#FFF9EB" stroke="#111111" stroke-width="5"/>' +
          '<rect x="170" y="190" width="420" height="58" rx="12" fill="#111111"/>' +
          '<text x="380" y="226" text-anchor="middle" font-family="Outfit, sans-serif" font-size="20" font-weight="800" letter-spacing="2.5" fill="#F4C84A">WELCOME · REGISTER A MOGUL</text>' +
          // Organiser / Welcome Coordinator behind desk
          mogulKid(380, 435, { skin: '#7A4821', shirt: '#F4C84A', apron: '#111111', hair: 'bun', armL: 'wave', armR: 'out' }) +
          // Registration Desk
          '<rect x="115" y="475" width="530" height="24" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="5"/>' +
          '<rect x="140" y="499" width="480" height="141" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="180" y="528" width="400" height="84" rx="12" fill="#111111"/>' +
          '<text x="380" y="578" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="30" fill="#F4C84A">Mini Moguls Check-In</text>' +
          // Clipboard & Lanyard Badges on Desk
          '<rect x="200" y="395" width="70" height="80" rx="8" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
          '<rect x="218" y="385" width="34" height="16" rx="4" fill="#111111"/>' +
          '<path d="M216 420 H254 M216 438 H254 M216 456 H242" stroke="#111111" stroke-width="3.5" stroke-linecap="round"/>' +
          // Right: Parent/Guardian & Excited Young Mogul arriving with their Registration Badge!
          mogulKid(770, 520, { skin: '#8D5524', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'puffs', armL: 'wave', armR: 'up', legs: true, scale: 0.92 }) +
          mogulKid(955, 500, { skin: '#6F3E18', shirt: '#111111', apron: '', hair: 'short', armL: 'out', armR: 'up', legs: true, scale: 1.08 }) +
          // Giant Official "MINI MOGUL" Creator Pass Badge above
          '<g transform="translate(860 245)">' +
            '<path d="M-30-65 L0-105 L30-65" fill="none" stroke="#111111" stroke-width="5" stroke-linecap="round"/>' +
            '<rect x="-110" y="-65" width="220" height="125" rx="16" fill="#F4C84A" stroke="#111111" stroke-width="5"/>' +
            '<rect x="-92" y="-45" width="184" height="40" rx="8" fill="#111111"/>' +
            '<text x="0" y="-19" text-anchor="middle" font-family="Outfit, sans-serif" font-size="16" font-weight="800" letter-spacing="2" fill="#F4C84A">CREATOR PASS</text>' +
            '<text x="0" y="32" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="24" fill="#111111">12 DEC 2026</text>' +
          '</g>' +
          spk(660, 290, 0.95, '#F4C84A') + spk(1080, 270, 0.85, '#FFFFFF');
      }
      if (time === 'day' || time === 'dawn') {
        // SCENE 2: YOUNG ARTIST STUDIO — GIANT EASEL, PAINT PALETTE & POTTERY BENCH
        return '<circle cx="240" cy="220" r="140" fill="#F4C84A" opacity=".35"/>' +
          floorPlane(640, '#F4E6CC') +
          // Hanging gallery frames on studio wall
          '<rect x="110" y="130" width="110" height="135" rx="10" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<circle cx="165" cy="185" r="28" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
          '<path d="M135 240 L165 205 L195 240 Z" fill="#111111"/>' +
          '<rect x="250" y="160" width="95" height="105" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
          '<path d="M275 235 L298 188 L322 235 Z" fill="#FFFFFF" stroke="#111111" stroke-width="3.5"/>' +
          // Pottery & Stationery Workbench on Left
          mogulKid(290, 465, { skin: '#7A4821', shirt: '#111111', apron: '#F4C84A', hair: 'puffs', armL: 'down', armR: 'out' }) +
          '<rect x="110" y="485" width="380" height="22" rx="8" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="135" y="507" width="330" height="133" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="165" y="535" width="270" height="75" rx="10" fill="#111111"/>' +
          '<text x="300" y="580" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="28" fill="#F4C84A">Paper &amp; Clay Studio</text>' +
          // Vases, notebooks & brush jars on bench
          '<path d="M165 485 C155 445 165 415 185 408 H215 C235 415 245 445 235 485 Z" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          '<path d="M166 446 H234 M175 462 L192 446 L208 462 L225 446" fill="none" stroke="#111111" stroke-width="3.5"/>' +
          '<rect x="360" y="430" width="76" height="55" rx="6" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
          '<rect x="370" y="442" width="56" height="14" rx="3" fill="#F4C84A"/>' +
          // Giant Wooden Artist Easel & Canvas on Right
          '<path d="M760 640 L850 170 L940 640 M850 210 L1010 630" fill="none" stroke="#111111" stroke-width="8" stroke-linecap="round"/>' +
          '<rect x="720" y="210" width="260" height="310" rx="14" fill="#FFFFFF" stroke="#111111" stroke-width="5"/>' +
          '<rect x="742" y="232" width="216" height="266" rx="8" fill="#FFF9EB" stroke="#111111" stroke-width="3.5"/>' +
          // Artwork inside the giant canvas
          '<circle cx="850" cy="335" r="56" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          '<path d="M765 465 L825 385 L875 435 L910 395 L945 465 Z" fill="#111111"/>' +
          '<text x="850" y="275" text-anchor="middle" font-family="Outfit, sans-serif" font-size="18" font-weight="800" letter-spacing="3" fill="#111111">BIG IDEAS</text>' +
          '<rect x="700" y="515" width="300" height="20" rx="8" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
          // Standing Young Artist holding giant brush & palette
          mogulKid(655, 520, { skin: '#8D5524', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'cap', armL: 'out', armR: 'up', legs: true }) +
          // Artist palette in left hand
          '<ellipse cx="550" cy="515" rx="42" ry="30" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
          '<circle cx="534" cy="508" r="8" fill="#F4C84A"/><circle cx="556" cy="502" r="8" fill="#111111"/><circle cx="566" cy="522" r="7" fill="#F4C84A"/>' +
          pillBadge(850, 120, 'CREATE · ORIGINAL ART & CRAFTS', true) +
          spk(540, 210, 1.0, '#F4C84A') + spk(1055, 250, 0.85, '#FFFFFF');
      }

      // SCENE 1 (dunes/dusk & default): GRAND MARKET DAY ENTRANCE ARCH, STALL & CUSTOMER INTERACTION
      return '<circle cx="920" cy="240" r="150" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
        floorPlane(635, '#F4E6CC') +
        bunting(40, 75, 600, 145, 1160, 75, 12) +
        // Left: Market Stall with scalloped gold/white awning
        '<rect x="130" y="250" width="16" height="385" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
        '<rect x="654" y="250" width="16" height="385" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
        '<rect x="146" y="265" width="508" height="210" fill="#FFF9EB" stroke="#111111" stroke-width="4"/>' +
        '<rect x="210" y="282" width="380" height="44" rx="10" fill="#111111"/>' +
        '<text x="400" y="310" text-anchor="middle" font-family="Outfit, sans-serif" font-size="20" font-weight="800" letter-spacing="3" fill="#F4C84A">MINI MOGULS MARKET</text>' +
        // Awning stripes
        '<path d="M110 180H206V238A48 20 0 0 1 110 238Z" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
        '<path d="M206 180H302V238A48 20 0 0 1 206 238Z" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
        '<path d="M302 180H398V238A48 20 0 0 1 302 238Z" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
        '<path d="M398 180H494V238A48 20 0 0 1 398 238Z" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
        '<path d="M494 180H590V238A48 20 0 0 1 494 238Z" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
        '<path d="M590 180H686V238A48 20 0 0 1 590 238Z" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
        '<rect x="102" y="166" width="592" height="16" rx="7" fill="#111111"/>' +
        // Seller inside stall
        mogulKid(395, 435, { skin: '#7A4821', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'puffs', armL: 'wave', armR: 'out' }) +
        // Stall counter
        '<rect x="106" y="468" width="588" height="22" rx="8" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
        '<rect x="124" y="490" width="552" height="145" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
        '<path d="M165 490 H635 V585 L400 612 L165 585 Z" fill="#111111"/>' +
        '<text x="400" y="546" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="30" fill="#F4C84A">Create · Sell · Learn</text>' +
        '<text x="400" y="574" text-anchor="middle" font-family="Outfit, sans-serif" font-size="14" font-weight="800" letter-spacing="3" fill="#FFFFFF">HARARE · 12 DEC 2026</text>' +
        // Crafts on counter
        '<path d="M175 468 C168 438 175 415 190 408 H218 C233 415 240 438 233 468 Z" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
        '<rect x="520" y="405" width="70" height="63" rx="6" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
        '<circle cx="555" cy="436" r="15" fill="#F4C84A" stroke="#111111" stroke-width="3"/>' +
        // Right side: Standing young shopper/visitor receiving a sunshine-gold gift bag!
        mogulKid(895, 515, { skin: '#8D5524', shirt: '#111111', apron: '', hair: 'curly', armL: 'out', armR: 'up', legs: true }) +
        // Gift bag held between seller & customer
        '<rect x="725" y="470" width="76" height="86" rx="8" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
        '<path d="M745 470 C745 446 781 446 781 470" fill="none" stroke="#111111" stroke-width="4"/>' +
        '<path d="M763 495 L768 507 L780 512 L768 517 L763 529 L758 517 L746 512 L758 507 Z" fill="#FFFFFF" stroke="#111111" stroke-width="2.5"/>' +
        // Direction Signpost on far right
        '<line x1="1065" y1="350" x2="1065" y2="635" stroke="#111111" stroke-width="8" stroke-linecap="round"/>' +
        '<path d="M980 370 H1140 L1160 395 L1140 420 H980 Z" fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linejoin="round"/>' +
        '<text x="1062" y="401" text-anchor="middle" font-family="Outfit, sans-serif" font-size="15" font-weight="800" fill="#111111">STALLS &amp; IDEAS</text>' +
        spk(760, 290, 0.9, '#FFFFFF') + spk(1050, 220, 0.85, '#F4C84A');
    },

    // =========================================================================
    // 2. MOUNTAINS: BAKING, FOOD & PRODUCT BRAINSTORMING
    //    - day:  "THE BIG IDEA BRAINSTORMING TABLE" (Guide 1: Choosing your product, About Hero, Article Hero)
    //    - dawn: "ROLLING BAKERY CART & GIANT CAFÉ UMBRELLA" (Hero Postcard, Category 2, Showcase 3)
    //    - dusk/night: "FRESH LEMONADE & SMOOTHIE JAR BAR" (Showcase 4)
    // =========================================================================
    mountains: function (id, sky, c, time) {
      if (time === 'day') {
        // SCENE 13: THE BIG IDEA BRAINSTORMING WORKSHOP (Choosing Your Product!)
        return floorPlane(645, '#F4E6CC') +
          // Cork/Pinboard on Left Wall with Product Sketches & Sticky Notes
          '<rect x="95" y="135" width="310" height="230" rx="14" fill="#FFFFFF" stroke="#111111" stroke-width="5"/>' +
          '<rect x="112" y="152" width="276" height="196" rx="8" fill="#FFF9EB" stroke="#111111" stroke-width="3"/>' +
          '<rect x="132" y="172" width="85" height="75" fill="#F4C84A" stroke="#111111" stroke-width="3.5" transform="rotate(-4 174 210)"/>' +
          '<text x="174" y="214" text-anchor="middle" font-family="Outfit, sans-serif" font-size="14" font-weight="800" fill="#111111">IDEA #1</text>' +
          '<rect x="240" y="172" width="120" height="82" fill="#FFFFFF" stroke="#111111" stroke-width="3.5"/>' +
          '<path d="M260 200 H340 M260 218 H320 M260 236 H300" stroke="#111111" stroke-width="3.5" stroke-linecap="round"/>' +
          '<rect x="145" y="268" width="210" height="58" rx="8" fill="#111111"/>' +
          '<text x="250" y="303" text-anchor="middle" font-family="Outfit, sans-serif" font-size="17" font-weight="800" letter-spacing="2" fill="#F4C84A">CREATE · TEST · LAUNCH</text>' +
          // Giant Glowing Idea Lightbulb Overhead in Center-Right
          '<circle cx="660" cy="195" r="115" fill="url(#' + id + 'g)"/>' +
          '<path d="M610 185 A50 50 0 1 1 710 185 C710 212 688 225 684 246 H636 C632 225 610 212 610 185 Z" fill="#F4C84A" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>' +
          '<rect x="640" y="246" width="40" height="22" rx="6" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<path d="M648 268 H672" stroke="#111111" stroke-width="5" stroke-linecap="round"/>' +
          '<path d="M660 105 V75 M735 135 L758 115 M750 195 H780 M585 135 L562 115 M570 195 H540" stroke="#111111" stroke-width="5" stroke-linecap="round"/>' +
          // Three Young Moguls Brainstorming around a Wide Creative Worktable
          mogulKid(350, 465, { skin: '#7A4821', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'puffs', armL: 'wave', armR: 'down' }) +
          mogulKid(660, 455, { skin: '#8D5524', shirt: '#111111', apron: '#F4C84A', hair: 'curly', armL: 'up', armR: 'up' }) +
          mogulKid(945, 465, { skin: '#6F3E18', shirt: '#FFFFFF', apron: '#F4C84A', hair: 'cap', armL: 'down', armR: 'wave' }) +
          // Wide Collaboration Table
          '<rect x="170" y="495" width="900" height="24" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="5"/>' +
          '<rect x="210" y="519" width="820" height="126" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="380" y="542" width="480" height="78" rx="14" fill="#111111"/>' +
          '<text x="620" y="590" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="32" fill="#F4C84A">Big Ideas Start Here</text>' +
          // Sketchbooks, Prototype Box, Scissors & Pencils on Table
          '<path d="M260 495 L290 455 H390 L370 495 Z" fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linejoin="round"/>' +
          '<rect x="490" y="435" width="75" height="60" rx="8" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          '<path d="M490 455 H565 M527 435 V495" stroke="#111111" stroke-width="3.5"/>' +
          '<rect x="765" y="440" width="46" height="55" rx="6" fill="#111111"/>' +
          '<path d="M778 440 L772 405 M790 440 L790 400 M800 440 L808 408" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>' +
          spk(980, 180, 1.1, '#F4C84A') + spk(500, 290, 0.75, '#FFFFFF');
      }

      if (time === 'night') {
        // THREE AGE GROUPS: JUNIOR MOGULS (5–8), YOUNG MOGULS (9–13) & SENIOR MOGULS (14–18)
        return floorPlane(645, '#F4E6CC') +
          pillBadge(600, 95, 'THREE AGE GROUPS · GROWING WITH EVERY STAGE', true) +
          // 1. Left Podium: JUNIOR MOGULS (5–8)
          mogulKid(240, 445, { skin: '#8D5524', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'puffs', armL: 'wave', armR: 'up', scale: 0.86 }) +
          '<rect x="105" y="485" width="270" height="20" rx="8" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="120" y="505" width="240" height="140" rx="10" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="140" y="525" width="200" height="52" rx="8" fill="#111111"/>' +
          '<text x="240" y="558" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="22" fill="#F4C84A">Junior Moguls</text>' +
          '<text x="240" y="610" text-anchor="middle" font-family="Outfit, sans-serif" font-size="16" font-weight="800" fill="#111111">CONCEPT NOTE: AGES 5–8</text>' +
          // 2. Center Podium: YOUNG MOGULS (9–13)
          mogulKid(600, 415, { skin: '#7A4821', shirt: '#111111', apron: '#F4C84A', hair: 'curly', armL: 'wave', armR: 'up', scale: 0.96 }) +
          '<rect x="465" y="455" width="270" height="20" rx="8" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="480" y="475" width="240" height="170" rx="10" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="500" y="498" width="200" height="56" rx="8" fill="#111111"/>' +
          '<text x="600" y="533" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="23" fill="#F4C84A">Young Moguls</text>' +
          '<text x="600" y="592" text-anchor="middle" font-family="Outfit, sans-serif" font-size="16" font-weight="800" fill="#111111">CONCEPT NOTE: AGES 9–13</text>' +
          // 3. Right Podium: SENIOR MOGULS (14–18)
          mogulKid(960, 385, { skin: '#6F3E18', shirt: '#F4C84A', apron: '#111111', hair: 'cap', armL: 'wave', armR: 'up', scale: 1.05 }) +
          '<rect x="825" y="425" width="270" height="20" rx="8" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="840" y="445" width="240" height="200" rx="10" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="860" y="470" width="200" height="58" rx="8" fill="#111111"/>' +
          '<text x="960" y="506" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="23" fill="#F4C84A">Senior Moguls</text>' +
          '<text x="960" y="568" text-anchor="middle" font-family="Outfit, sans-serif" font-size="16" font-weight="800" fill="#111111">CONCEPT NOTE: AGES 14–18</text>' +
          spk(410, 210, 1.0, '#F4C84A') + spk(780, 190, 1.0, '#FFFFFF');
      }
      if (time === 'dusk') {
        // SCENE 4: FRESH LEMONADE, SMOOTHIE & SNACK JAR BAR
        return '<circle cx="940" cy="210" r="120" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          floorPlane(640, '#F4E6CC') +
          bunting(80, 90, 600, 150, 1120, 90, 10) +
          // arched menu backdrop
          '<path d="M240 640 V260 A360 180 0 0 1 960 260 V640 Z" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="370" y="210" width="460" height="56" rx="28" fill="#111111"/>' +
          '<text x="600" y="246" text-anchor="middle" font-family="Outfit, sans-serif" font-size="22" font-weight="800" letter-spacing="3" fill="#F4C84A">FRESH DRINKS &amp; SNACK JARS</text>' +
          mogulKid(460, 445, { skin: '#8D5524', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'curly', armL: 'wave', armR: 'down' }) +
          mogulKid(740, 445, { skin: '#7A4821', shirt: '#111111', apron: '#F4C84A', hair: 'puffs', armL: 'down', armR: 'up' }) +
          // Counter bar with striped front
          '<rect x="200" y="475" width="800" height="24" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="225" y="499" width="750" height="141" fill="#111111" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="260" y="520" width="680" height="98" rx="12" fill="#FFF9EB" stroke="#111111" stroke-width="3.5"/>' +
          '<text x="600" y="578" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="36" fill="#111111">Sip · Taste · Smile</text>' +
          // Three giant drink dispensers & fruit jars on bar
          '<rect x="275" y="375" width="74" height="100" rx="14" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="287" y="357" width="50" height="18" rx="6" fill="#111111"/>' +
          '<circle cx="312" cy="425" r="18" fill="#FFFFFF" stroke="#111111" stroke-width="3.5"/>' +
          '<rect x="565" y="385" width="70" height="90" rx="14" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="575" y="369" width="50" height="16" rx="6" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
          '<rect x="580" y="412" width="40" height="28" rx="4" fill="#F4C84A"/>' +
          '<rect x="835" y="410" width="55" height="65" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          '<path d="M862 410 L878 375" stroke="#111111" stroke-width="5" stroke-linecap="round"/>' +
          spk(160, 290, 0.9, '#F4C84A') + spk(1050, 350, 0.85, '#FFFFFF');
      }

      // SCENE 3 (mountains/dawn): ROLLING VINTAGE BAKERY CART & GIANT CAFÉ UMBRELLA
      return '<circle cx="210" cy="210" r="105" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
        floorPlane(640, '#F4E6CC') +
        // Giant Tilted Café Umbrella on Right
        '<line x1="770" y1="170" x2="720" y2="500" stroke="#111111" stroke-width="8" stroke-linecap="round"/>' +
        '<path d="M460 220 C530 95 990 95 1060 220 Z" fill="#F4C84A" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>' +
        '<path d="M610 220 C650 115 870 115 910 220 Z" fill="#FFFFFF" stroke="#111111" stroke-width="4.5" stroke-linejoin="round"/>' +
        '<path d="M460 220 H1060" stroke="#111111" stroke-width="6" stroke-linecap="round"/>' +
        // Two Young Bakers behind the Rolling Cart (left kid wearing tall chef toque!)
        mogulKid(465, 435, { skin: '#8D5524', shirt: '#FFFFFF', apron: '#F4C84A', hair: 'curly', armL: 'wave', armR: 'down' }) +
        '<path d="M432 310 C420 280 445 260 465 268 C485 260 510 280 498 310 Z" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
        mogulKid(685, 440, { skin: '#6F3E18', shirt: '#F4C84A', apron: '#111111', hair: 'puffs', armL: 'down', armR: 'up' }) +
        // Wheeled Bakery Cart Body
        '<rect x="210" y="465" width="660" height="24" rx="10" fill="#111111"/>' +
        '<rect x="235" y="489" width="610" height="125" rx="12" fill="#FFFFFF" stroke="#111111" stroke-width="5"/>' +
        '<rect x="265" y="512" width="550" height="78" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
        '<text x="540" y="560" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="34" fill="#111111">Young Bakers Cart</text>' +
        // Push-handle on left of cart
        '<path d="M235 510 H175 C160 510 160 480 175 480 H210" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>' +
        // Giant Spoked Cart Wheels
        '<circle cx="330" cy="612" r="56" fill="#111111"/><circle cx="330" cy="612" r="42" fill="#FFF9EB" stroke="#111111" stroke-width="4"/>' +
        '<circle cx="330" cy="612" r="12" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
        '<circle cx="750" cy="612" r="56" fill="#111111"/><circle cx="750" cy="612" r="42" fill="#FFF9EB" stroke="#111111" stroke-width="4"/>' +
        '<circle cx="750" cy="612" r="12" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
        // Giant 3-Tier Cake & Cupcake Display on Cart
        '<path d="M275 465 H395 M335 465 V355 M285 422 H385 M300 380 H370" stroke="#111111" stroke-width="5" stroke-linecap="round"/>' +
        '<circle cx="305" cy="408" r="13" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
        '<circle cx="335" cy="408" r="13" fill="#FFFFFF" stroke="#111111" stroke-width="3.5"/>' +
        '<circle cx="365" cy="408" r="13" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
        '<circle cx="320" cy="366" r="13" fill="#FFFFFF" stroke="#111111" stroke-width="3.5"/>' +
        '<circle cx="350" cy="366" r="13" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
        // Pastry Dome & Gift Cake Box
        '<path d="M535 465 A45 40 0 0 1 625 465 Z" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
        '<circle cx="580" cy="418" r="8" fill="#FFFFFF" stroke="#111111" stroke-width="3.5"/>' +
        '<rect x="755" y="405" width="76" height="60" rx="8" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
        '<path d="M755 435 H831 M793 405 V465" stroke="#F4C84A" stroke-width="5"/>' +
        // Sidewalk Chalkboard Menu on Right
        '<path d="M955 640 L995 475 L1035 640" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>' +
        '<rect x="935" y="490" width="120" height="105" rx="10" fill="#111111"/>' +
        '<text x="995" y="530" text-anchor="middle" font-family="Outfit, sans-serif" font-size="16" font-weight="800" fill="#F4C84A">CUPCAKES</text>' +
        '<text x="995" y="556" text-anchor="middle" font-family="Outfit, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">&amp; COOKIES</text>' +
        '<rect x="955" y="566" width="80" height="18" rx="9" fill="#F4C84A"/>' +
        spk(1040, 290, 0.95, '#F4C84A') + spk(135, 360, 0.75, '#FFFFFF');
    },

    // =========================================================================
    // 3. FJORD: PRICING/MONEY BASICS & TECH/ROBOTICS INNOVATION
    //    - night: "PRICING YOUR CREATIONS: CASH REGISTER, COINS & PROFIT CHART" (Guide 2!)
    //    - day/dusk: "TECH, CODING MONITOR & STANDING ROBOT LAB" (Showcase 5, Category 3)
    //    - dawn: "YOUNG INVENTORS & SCIENCE EXPERIMENT WORKBENCH" (Showcase 6)
    // =========================================================================
    fjord: function (id, sky, c, time) {
      if (time === 'night') {
        // SCENE 14: PRICING YOUR CREATIONS — MONEY BASICS, CASH REGISTER, COINS & FLIPCHART
        return floorPlane(645, '#F4E6CC') +
          pillBadge(600, 95, 'LEARN · PRICING & MONEY BASICS', true) +
          // Left: Standing Flipchart / Easel showing COSTS + VALUE = PRICE
          '<path d="M160 645 L245 190 L330 645 M245 220 L385 635" fill="none" stroke="#111111" stroke-width="7" stroke-linecap="round"/>' +
          '<rect x="115" y="205" width="270" height="275" rx="14" fill="#FFFFFF" stroke="#111111" stroke-width="5"/>' +
          '<rect x="135" y="225" width="230" height="44" rx="8" fill="#111111"/>' +
          '<text x="250" y="253" text-anchor="middle" font-family="Outfit, sans-serif" font-size="17" font-weight="800" letter-spacing="2" fill="#F4C84A">MONEY BASICS</text>' +
          // Bar chart on easel
          '<rect x="165" y="385" width="38" height="60" rx="5" fill="#F4E6CC" stroke="#111111" stroke-width="3.5"/>' +
          '<rect x="228" y="340" width="38" height="105" rx="5" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
          '<rect x="291" y="295" width="38" height="150" rx="5" fill="#111111"/>' +
          '<path d="M150 445 H345" stroke="#111111" stroke-width="4" stroke-linecap="round"/>' +
          '<path d="M175 355 L245 315 L310 278" fill="none" stroke="#F4C84A" stroke-width="5" stroke-linecap="round"/>' +
          '<circle cx="310" cy="278" r="8" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
          // Center: Confident Young Entrepreneur behind Checkout Counter
          mogulKid(615, 450, { skin: '#7A4821', shirt: '#F4C84A', apron: '#111111', hair: 'puffs', armL: 'wave', armR: 'up' }) +
          // Checkout Counter
          '<rect x="430" y="485" width="670" height="24" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="5"/>' +
          '<rect x="455" y="509" width="620" height="136" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="495" y="534" width="540" height="84" rx="12" fill="#111111"/>' +
          '<text x="765" y="586" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="32" fill="#F4C84A">Smart Pricing &amp; Sales</text>' +
          // Classic Cash Register on Counter
          '<rect x="745" y="380" width="165" height="105" rx="14" fill="#111111" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="775" y="330" width="105" height="42" rx="8" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          '<text x="827" y="358" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="24" fill="#111111">US$5</text>' +
          '<rect x="768" y="402" width="120" height="46" rx="6" fill="#FFFFFF"/>' +
          '<circle cx="790" cy="418" r="6" fill="#111111"/><circle cx="815" cy="418" r="6" fill="#111111"/><circle cx="840" cy="418" r="6" fill="#111111"/><circle cx="865" cy="418" r="6" fill="#F4C84A" stroke="#111111" stroke-width="2.5"/>' +
          '<circle cx="790" cy="434" r="6" fill="#111111"/><circle cx="815" cy="434" r="6" fill="#111111"/><circle cx="840" cy="434" r="6" fill="#111111"/><circle cx="865" cy="434" r="6" fill="#111111"/>' +
          // Stacked Gold Coins & Giant Price Tag on Right
          '<ellipse cx="975" cy="472" rx="34" ry="11" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
          '<ellipse cx="975" cy="456" rx="34" ry="11" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
          '<ellipse cx="975" cy="440" rx="34" ry="11" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
          '<ellipse cx="975" cy="424" rx="34" ry="11" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
          // Floating Giant Price Tag Badge in Top Right
          '<g transform="translate(985 215) rotate(12)">' +
            '<path d="M-75-45 H45 L85 0 L45 45 H-75 Z" fill="#F4C84A" stroke="#111111" stroke-width="4.5" stroke-linejoin="round"/>' +
            '<circle cx="42" cy="0" r="10" fill="#FFFFFF" stroke="#111111" stroke-width="3.5"/>' +
            '<text x="-15" y="9" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="28" fill="#111111">PRICE</text>' +
          '</g>' +
          spk(480, 210, 0.95, '#F4C84A') + spk(1090, 340, 0.85, '#FFFFFF');
      }

      if (time === 'dawn') {
        // SCENE 6: YOUNG INVENTORS, ROCKET & SCIENCE EXPERIMENT WORKBENCH
        return '<circle cx="910" cy="210" r="120" fill="#F4C84A" opacity=".35"/>' +
          floorPlane(640, '#F4E6CC') +
          pillBadge(600, 95, 'INNOVATE · SCIENCE & INVENTION KITS', false) +
          // Blueprint board on wall
          '<rect x="120" y="155" width="330" height="210" rx="14" fill="#111111" stroke="#111111" stroke-width="4.5"/>' +
          '<circle cx="220" cy="260" r="52" fill="none" stroke="#F4C84A" stroke-width="4" stroke-dasharray="8 6"/>' +
          '<circle cx="220" cy="260" r="22" fill="#F4C84A"/>' +
          '<path d="M300 205 H410 M300 235 H390 M300 265 H420 M300 295 H370" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>' +
          mogulKid(460, 450, { skin: '#8D5524', shirt: '#FFFFFF', apron: '#F4C84A', hair: 'locs', armL: 'wave', armR: 'down' }) +
          mogulKid(760, 450, { skin: '#7A4821', shirt: '#F4C84A', apron: '#111111', hair: 'cap', armL: 'down', armR: 'up' }) +
          // Lab Workbench
          '<rect x="160" y="480" width="880" height="24" rx="10" fill="#111111"/>' +
          '<rect x="190" y="504" width="820" height="136" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="360" y="530" width="480" height="84" rx="12" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          '<text x="600" y="582" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="32" fill="#111111">Young Inventors Lab</text>' +
          // Rocket Prototype, Beakers & Gears on Bench
          '<path d="M280 355 C310 390 315 435 315 480 H245 C245 435 250 390 280 355 Z" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
          '<circle cx="280" cy="415" r="14" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
          '<path d="M245 445 L220 480 H245 Z M315 445 L340 480 H315 Z" fill="#111111" stroke="#111111" stroke-width="3.5"/>' +
          // Science beaker & flask
          '<path d="M585 405 H625 M605 405 V430 L635 480 H575 L605 430 Z" fill="#F4C84A" stroke="#111111" stroke-width="4" stroke-linejoin="round"/>' +
          '<circle cx="605" cy="382" r="9" fill="#FFFFFF" stroke="#111111" stroke-width="3.5"/>' +
          '<circle cx="622" cy="362" r="6" fill="#F4C84A" stroke="#111111" stroke-width="3"/>' +
          // DIY Kit Box on right
          '<rect x="860" y="400" width="110" height="80" rx="10" fill="#111111"/>' +
          '<text x="915" y="446" text-anchor="middle" font-family="Outfit, sans-serif" font-size="16" font-weight="800" fill="#F4C84A">STEM KIT</text>' +
          spk(580, 210, 1.0, '#F4C84A') + spk(1030, 310, 0.85, '#FFFFFF');
      }

      // SCENE 5 (fjord/day & default): CODING MONITOR, STANDING ROBOT & DRONE SHOWCASE
      return '<circle cx="260" cy="210" r="125" fill="#F4C84A" opacity=".35"/>' +
        floorPlane(640, '#F4E6CC') +
        // Giant Widescreen Coding Display on Left
        '<rect x="110" y="160" width="380" height="250" rx="18" fill="#111111" stroke="#111111" stroke-width="5"/>' +
        '<rect x="130" y="180" width="340" height="195" rx="10" fill="#FFF9EB"/>' +
        '<circle cx="152" cy="202" r="6" fill="#F4C84A" stroke="#111111" stroke-width="2.5"/><circle cx="172" cy="202" r="6" fill="#111111"/>' +
        '<rect x="152" y="226" width="130" height="28" rx="6" fill="#F4C84A" stroke="#111111" stroke-width="3"/>' +
        '<rect x="182" y="268" width="170" height="28" rx="6" fill="#111111"/>' +
        '<rect x="152" y="310" width="110" height="28" rx="6" fill="#F4C84A" stroke="#111111" stroke-width="3"/>' +
        '<path d="M390 250 L435 280 L390 310 Z" fill="#F4C84A" stroke="#111111" stroke-width="3.5" stroke-linejoin="round"/>' +
        '<rect x="270" y="410" width="60" height="70" fill="#111111"/><rect x="220" y="472" width="160" height="14" rx="6" fill="#111111"/>' +
        // Center: Large Friendly Standing Robot on Pedestal!
        '<line x1="620" y1="245" x2="620" y2="200" stroke="#111111" stroke-width="6"/>' +
        '<circle cx="620" cy="192" r="14" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
        '<rect x="550" y="245" width="140" height="105" rx="24" fill="#FFFFFF" stroke="#111111" stroke-width="5"/>' +
        '<rect x="572" y="270" width="96" height="44" rx="12" fill="#111111"/>' +
        '<circle cx="598" cy="292" r="11" fill="#F4C84A"/><circle cx="642" cy="292" r="11" fill="#F4C84A"/>' +
        '<path d="M598 330 H642" stroke="#111111" stroke-width="5" stroke-linecap="round"/>' +
        '<rect x="535" y="362" width="170" height="125" rx="20" fill="#F4C84A" stroke="#111111" stroke-width="5"/>' +
        '<rect x="570" y="392" width="100" height="62" rx="10" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
        '<path d="M588 425 L608 408 L628 432 L652 405" fill="none" stroke="#111111" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>' +
        // Young Tech Creator on Right with Laptop
        mogulKid(915, 450, { skin: '#7A4821', shirt: '#111111', apron: '#F4C84A', hair: 'cap', armL: 'wave', armR: 'up' }) +
        // Tech Showcase Desk
        '<rect x="490" y="485" width="600" height="22" rx="8" fill="#111111"/>' +
        '<rect x="515" y="507" width="550" height="133" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
        '<rect x="555" y="532" width="470" height="82" rx="12" fill="#111111"/>' +
        '<text x="790" y="582" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="32" fill="#F4C84A">Tech &amp; Coding Demos</text>' +
        spk(770, 175, 1.0, '#F4C84A') + spk(1060, 220, 0.85, '#FFFFFF');
    },

    // =========================================================================
    // 4. COAST: FASHION, BOUTIQUE RACK & STAGE PRESENTATION
    //    - day:  "BOUTIQUE MANNEQUIN, GARMENT RACK & ARCHED MIRROR" (Category 4, Showcase 7)
    //    - dawn: "TOTE BAG SCREEN-PRINTING & BEAD STUDIO" (Showcase 8)
    //    - dusk/night: "CONFIDENT YOUNG PRESENTER ON STAGE WITH MICROPHONE" (Guide/Story)
    // =========================================================================
    coast: function (id, sky, c, time) {
      if (time === 'night') {
        // SPONSORS, PARTNERS & COMMUNITY SUPPORT ("HELP SHAPE THE NEXT GENERATION OF INNOVATORS")
        return '<circle cx="600" cy="230" r="160" fill="#F4C84A" opacity=".32"/>' +
          floorPlane(645, '#F4E6CC') +
          bunting(50, 75, 600, 135, 1150, 75, 11) +
          pillBadge(600, 165, 'PARTNERS & SPONSORS · INVEST IN YOUNG INNOVATORS', true) +
          // Three Rising Pillars of Impact on Left (CREATE, SELL, LEARN)
          '<rect x="115" y="250" width="280" height="395" rx="18" fill="#FFFFFF" stroke="#111111" stroke-width="5"/>' +
          '<rect x="140" y="278" width="230" height="50" rx="10" fill="#111111"/>' +
          '<text x="255" y="310" text-anchor="middle" font-family="Outfit, sans-serif" font-size="17" font-weight="800" letter-spacing="2" fill="#F4C84A">SHARED IMPACT</text>' +
          '<rect x="145" y="350" width="220" height="68" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
          '<text x="255" y="391" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="22" fill="#111111">Youth Creativity</text>' +
          '<rect x="145" y="435" width="220" height="68" rx="10" fill="#FFF9EB" stroke="#111111" stroke-width="3.5"/>' +
          '<text x="255" y="476" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="22" fill="#111111">Financial Skills</text>' +
          '<rect x="145" y="520" width="220" height="68" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
          '<text x="255" y="561" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="22" fill="#111111">Future Leaders</text>' +
          // Right: Partner / Supporter championing two young entrepreneurs at their showcase table
          mogulKid(565, 445, { skin: '#7A4821', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'puffs', armL: 'wave', armR: 'up' }) +
          mogulKid(775, 430, { skin: '#6F3E18', shirt: '#111111', apron: '', hair: 'short', armL: 'up', armR: 'up', scale: 1.08 }) +
          mogulKid(975, 445, { skin: '#8D5524', shirt: '#F4C84A', apron: '#111111', hair: 'curly', armL: 'down', armR: 'wave' }) +
          '<rect x="455" y="485" width="635" height="24" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="5"/>' +
          '<rect x="480" y="509" width="585" height="136" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="520" y="534" width="505" height="84" rx="12" fill="#111111"/>' +
          '<text x="772" y="586" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="30" fill="#F4C84A">Community &amp; Business Partners</text>' +
          spk(435, 250, 1.05, '#F4C84A') + spk(1080, 250, 0.9, '#FFFFFF');
      }
      if (time === 'dusk') {
        // SCENE 16: CONFIDENT YOUNG MOGUL PRESENTING ON STAGE WITH MICROPHONE
        return floorPlane(645, '#F4E6CC') +
          bunting(60, 80, 600, 140, 1140, 80, 11) +
          // Stage Spotlight & Presentation Board
          '<rect x="140" y="185" width="380" height="260" rx="16" fill="#FFFFFF" stroke="#111111" stroke-width="5"/>' +
          '<rect x="165" y="210" width="330" height="50" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
          '<text x="330" y="242" text-anchor="middle" font-family="Outfit, sans-serif" font-size="20" font-weight="800" letter-spacing="2" fill="#111111">MY BUSINESS IDEA</text>' +
          '<circle cx="240" cy="345" r="46" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          '<path d="M315 315 H460 M315 345 H440 M315 375 H410" stroke="#111111" stroke-width="4.5" stroke-linecap="round"/>' +
          // Young Entrepreneur Pitching at Podium with Microphone
          mogulKid(740, 440, { skin: '#8D5524', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'puffs', armL: 'wave', armR: 'up' }) +
          // Microphone on stand
          '<path d="M645 470 V345 L675 325" fill="none" stroke="#111111" stroke-width="5" stroke-linecap="round"/>' +
          '<ellipse cx="682" cy="320" rx="10" ry="14" fill="#111111" transform="rotate(30 682 320)"/>' +
          // Podium & Stage Platform
          '<rect x="615" y="470" width="250" height="22" rx="8" fill="#111111"/>' +
          '<rect x="640" y="492" width="200" height="153" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
          '<circle cx="740" cy="565" r="42" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
          '<path d="M740 538 L748 556 L766 564 L748 572 L740 590 L732 572 L714 564 L732 556 Z" fill="#111111"/>' +
          spk(960, 230, 1.1, '#F4C84A') + spk(570, 200, 0.85, '#FFFFFF');
      }

      if (time === 'dawn') {
        // SCENE 8: CUSTOM TOTE BAG PRINTING & JEWELLERY WORKTABLE
        return floorPlane(640, '#F4E6CC') +
          pillBadge(600, 95, 'CREATE · CUSTOM TOTE BAGS & TEXTILES', false) +
          // Hanging clothesline of printed graphic tote bags!
          '<path d="M100 175 Q600 225 1100 175" fill="none" stroke="#111111" stroke-width="4.5"/>' +
          '<g transform="translate(210 190)"><rect x="0" y="24" width="92" height="105" rx="8" fill="#F4C84A" stroke="#111111" stroke-width="4"/><path d="M24 24C24 0 68 0 68 24" fill="none" stroke="#111111" stroke-width="4"/><circle cx="46" cy="76" r="22" fill="#FFFFFF" stroke="#111111" stroke-width="3.5"/></g>' +
          '<g transform="translate(360 198)"><rect x="0" y="24" width="92" height="105" rx="8" fill="#FFFFFF" stroke="#111111" stroke-width="4"/><path d="M24 24C24 0 68 0 68 24" fill="none" stroke="#111111" stroke-width="4"/><path d="M24 92L46 54L68 92Z" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/></g>' +
          '<g transform="translate(750 198)"><rect x="0" y="24" width="92" height="105" rx="8" fill="#111111" stroke="#111111" stroke-width="4"/><path d="M24 24C24 0 68 0 68 24" fill="none" stroke="#111111" stroke-width="4"/><circle cx="46" cy="76" r="22" fill="#F4C84A"/></g>' +
          '<g transform="translate(900 190)"><rect x="0" y="24" width="92" height="105" rx="8" fill="#F4C84A" stroke="#111111" stroke-width="4"/><path d="M24 24C24 0 68 0 68 24" fill="none" stroke="#111111" stroke-width="4"/><rect x="24" y="56" width="44" height="40" rx="5" fill="#FFFFFF" stroke="#111111" stroke-width="3.5"/></g>' +
          mogulKid(595, 445, { skin: '#7A4821', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'curly', armL: 'wave', armR: 'up' }) +
          '<rect x="220" y="480" width="760" height="24" rx="10" fill="#111111"/>' +
          '<rect x="245" y="504" width="710" height="136" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="370" y="530" width="460" height="84" rx="12" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          '<text x="600" y="582" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="32" fill="#111111">Tote Bags &amp; Textiles</text>';
      }

      // SCENE 7 (coast/day & default): BOUTIQUE MANNEQUIN, GARMENT RACK & FULL-LENGTH ARCHED MIRROR
      return '<circle cx="600" cy="240" r="145" fill="#F4C84A" opacity=".3"/>' +
        floorPlane(640, '#F4E6CC') +
        // Left: Dressmaker Mannequin on Stand
        '<line x1="215" y1="450" x2="215" y2="640" stroke="#111111" stroke-width="7"/>' +
        '<path d="M160 640 L215 595 L270 640" fill="none" stroke="#111111" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="M165 270 C165 240 265 240 265 270 L280 445 H150 Z" fill="#F4C84A" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>' +
        '<rect x="198" y="212" width="34" height="34" rx="8" fill="#111111"/>' +
        '<path d="M185 270 L215 335 L245 270" fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linejoin="round"/>' +
        // Center-Left: Boutique Rolling Garment Rack with Tees & Tote Bags
        '<rect x="340" y="210" width="290" height="430" rx="14" fill="none" stroke="#111111" stroke-width="6"/>' +
        '<line x1="315" y1="640" x2="655" y2="640" stroke="#111111" stroke-width="8" stroke-linecap="round"/>' +
        '<rect x="370" y="250" width="95" height="125" rx="10" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
        '<circle cx="417" cy="312" r="24" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
        '<rect x="495" y="250" width="95" height="125" rx="10" fill="#111111" stroke="#111111" stroke-width="4"/>' +
        '<path d="M522 330 L542 288 L562 330 Z" fill="#F4C84A"/>' +
        // Bottom shelf of garment rack with shoe/accessory boxes
        '<rect x="365" y="545" width="110" height="65" rx="6" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
        '<rect x="495" y="555" width="105" height="55" rx="6" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
        // Center-Right: Standing Young Fashion Designer
        mogulKid(765, 515, { skin: '#8D5524', shirt: '#111111', apron: '#F4C84A', hair: 'puffs', armL: 'wave', armR: 'up', legs: true }) +
        // Right: Tall Arched Boutique Mirror
        '<path d="M920 640 V260 A95 95 0 0 1 1110 260 V640 Z" fill="#111111" stroke="#111111" stroke-width="5"/>' +
        '<path d="M936 624 V264 A79 79 0 0 1 1094 264 V624 Z" fill="#FFFFFF" stroke="#F4C84A" stroke-width="4"/>' +
        '<path d="M965 360 L1035 290 M975 410 L1065 320" stroke="#F4C84A" stroke-width="5" stroke-linecap="round"/>' +
        pillBadge(485, 125, 'FASHION · JEWELLERY & STYLE', true) +
        spk(870, 210, 0.95, '#F4C84A') + spk(135, 175, 0.8, '#FFFFFF');
    },

    // =========================================================================
    // 5. FUJI: TABLE DISPLAY TIPS, BOARD GAMES & CARNIVAL WHEEL
    //    - dusk: "MAKING YOUR TABLE SHINE: DISPLAY TIPS, BANNERS & TIERED RISERS" (Guide 3!)
    //    - dawn: "GIANT BOARD GAME, 3D DICE & COMIC ZINES" (Category 5, Showcase 9)
    //    - day/night: "CARNIVAL PRIZE WHEEL & SKILL CHALLENGE" (Showcase 10)
    // =========================================================================
    fuji: function (id, sky, c, time) {
      if (time === 'night') {
        // TEAMWORK, COMMUNICATION & CUSTOMER INTERACTION
        return floorPlane(645, '#F4E6CC') +
          pillBadge(600, 95, 'LEARN · COMMUNICATION, TEAMWORK & CONFIDENCE', false) +
          // Speech Bubbles showing confident communication between co-founders & customers
          '<g transform="translate(340 215)">' +
            '<rect x="-150" y="-48" width="300" height="82" rx="22" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
            '<path d="M-20 34 L0 64 L25 34 Z" fill="#FFFFFF" stroke="#111111" stroke-width="4.5" stroke-linejoin="round"/>' +
            '<text x="0" y="2" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="24" fill="#111111">“We made this together!”</text>' +
          '</g>' +
          '<g transform="translate(860 225)">' +
            '<rect x="-145" y="-45" width="290" height="78" rx="22" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
            '<path d="M-25 33 L-5 60 L18 33 Z" fill="#F4C84A" stroke="#111111" stroke-width="4.5" stroke-linejoin="round"/>' +
            '<text x="0" y="2" text-anchor="middle" font-family="Outfit, sans-serif" font-size="18" font-weight="800" fill="#111111">★ GREAT EXPLANATION! ★</text>' +
          '</g>' +
          // Two Co-Founders Collaborating Behind Stall + Customer on Right
          mogulKid(290, 445, { skin: '#7A4821', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'puffs', armL: 'wave', armR: 'out' }) +
          mogulKid(515, 445, { skin: '#8D5524', shirt: '#111111', apron: '#F4C84A', hair: 'cap', armL: 'out', armR: 'up' }) +
          mogulKid(915, 515, { skin: '#6F3E18', shirt: '#FFFFFF', apron: '', hair: 'curly', armL: 'wave', armR: 'up', legs: true }) +
          '<rect x="135" y="485" width="550" height="24" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="5"/>' +
          '<rect x="160" y="509" width="500" height="136" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="195" y="534" width="430" height="84" rx="12" fill="#111111"/>' +
          '<text x="410" y="586" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="30" fill="#F4C84A">Teamwork &amp; Customer Care</text>' +
          spk(610, 290, 1.0, '#F4C84A') + spk(1070, 320, 0.85, '#FFFFFF');
      }
      if (time === 'dusk') {
        // SCENE 15: MAKING YOUR TABLE SHINE — VISUAL MERCHANDISING, BANNER & TIERED STANDS (Guide 3!)
        return floorPlane(645, '#F4E6CC') +
          // Overhead Hanging "WELCOME!" Display Banner with String Lights
          '<line x1="210" y1="80" x2="210" y2="170" stroke="#111111" stroke-width="5"/>' +
          '<line x1="990" y1="80" x2="990" y2="170" stroke="#111111" stroke-width="5"/>' +
          '<rect x="170" y="135" width="860" height="84" rx="20" fill="#111111" stroke="#111111" stroke-width="5"/>' +
          '<rect x="186" y="149" width="828" height="56" rx="12" fill="#F4C84A"/>' +
          '<text x="600" y="186" text-anchor="middle" font-family="Outfit, sans-serif" font-size="26" font-weight="800" letter-spacing="4" fill="#111111">★ MAKE YOUR TABLE SHINE ★</text>' +
          // Young Creator Behind Perfectly Styled Display Table
          mogulKid(590, 440, { skin: '#7A4821', shirt: '#111111', apron: '#F4C84A', hair: 'curly', armL: 'wave', armR: 'up' }) +
          // Styled Table with Scalloped Gold Tablecloth
          '<rect x="150" y="475" width="900" height="24" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="5"/>' +
          '<rect x="180" y="499" width="840" height="146" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<path d="M180 499 H320 V545 A70 26 0 0 1 180 545 Z M320 499 H460 V545 A70 26 0 0 1 320 545 Z M460 499 H600 V545 A70 26 0 0 1 460 545 Z M600 499 H740 V545 A70 26 0 0 1 600 545 Z M740 499 H880 V545 A70 26 0 0 1 740 545 Z M880 499 H1020 V545 A70 26 0 0 1 880 545 Z" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          // Left: 3-Step Tiered Wooden Display Risers with Neat Product Pyramid
          '<rect x="205" y="445" width="210" height="30" rx="5" fill="#111111"/>' +
          '<rect x="230" y="415" width="160" height="30" rx="5" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
          '<rect x="255" y="385" width="110" height="30" rx="5" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          '<circle cx="285" cy="366" r="16" fill="#FFFFFF" stroke="#111111" stroke-width="3.5"/>' +
          '<circle cx="335" cy="366" r="16" fill="#111111"/>' +
          // Right: Framed Tabletop Sign + Gift Bundles
          '<rect x="775" y="365" width="125" height="110" rx="10" fill="#111111" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="790" y="380" width="95" height="80" rx="6" fill="#FFF9EB"/>' +
          '<text x="837" y="414" text-anchor="middle" font-family="Outfit, sans-serif" font-size="14" font-weight="800" fill="#111111">SPECIAL</text>' +
          '<text x="837" y="442" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="24" fill="#111111">US$5</text>' +
          '<rect x="920" y="410" width="75" height="65" rx="8" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          '<path d="M920 442 H995 M957 410 V475" stroke="#111111" stroke-width="4"/>' +
          spk(120, 310, 1.05, '#F4C84A') + spk(1080, 300, 1.05, '#F4C84A') + spk(430, 290, 0.8, '#FFFFFF') + spk(760, 290, 0.8, '#FFFFFF');
      }

      if (time === 'day') {
        // SCENE 10: INTERACTIVE CARNIVAL RING-TOSS, WINNER TROPHY & TICKET BOOTH
        return '<circle cx="240" cy="210" r="120" fill="#F4C84A" opacity=".35"/>' +
          floorPlane(640, '#F4E6CC') +
          bunting(50, 75, 600, 135, 1150, 75, 11) +
          // Left: Classic Ticket & Prize Booth Arch
          '<rect x="120" y="210" width="320" height="430" rx="18" fill="#FFFFFF" stroke="#111111" stroke-width="5"/>' +
          '<rect x="145" y="235" width="270" height="54" rx="10" fill="#111111"/>' +
          '<text x="280" y="269" text-anchor="middle" font-family="Outfit, sans-serif" font-size="20" font-weight="800" letter-spacing="3" fill="#F4C84A">PLAY &amp; WIN</text>' +
          mogulKid(280, 445, { skin: '#7A4821', shirt: '#F4C84A', apron: '#111111', hair: 'puffs', armL: 'wave', armR: 'up' }) +
          '<rect x="105" y="470" width="350" height="22" rx="8" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="120" y="492" width="320" height="148" fill="#111111"/>' +
          '<text x="280" y="575" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="30" fill="#F4C84A">Ticket Booth</text>' +
          // Right: Interactive Ring-Toss Pegs, Giant Gold Trophy & Young Challenger
          '<rect x="520" y="485" width="560" height="24" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="5"/>' +
          '<rect x="545" y="509" width="510" height="131" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="585" y="534" width="430" height="80" rx="12" fill="#111111"/>' +
          '<text x="800" y="584" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="30" fill="#F4C84A">Skill Challenges</text>' +
          // Ring toss cones & flying gold rings
          '<path d="M580 485 L605 390 L630 485 Z M660 485 L685 370 L710 485 Z M740 485 L765 390 L790 485 Z" fill="#F4C84A" stroke="#111111" stroke-width="4" stroke-linejoin="round"/>' +
          '<ellipse cx="685" cy="340" rx="34" ry="12" fill="none" stroke="#111111" stroke-width="6"/>' +
          '<ellipse cx="605" cy="355" rx="32" ry="11" fill="none" stroke="#F4C84A" stroke-width="6"/>' +
          // Giant Champion Trophy Cup on Right
          '<path d="M880 355 H980 V405 C980 440 880 440 880 405 Z" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
          '<path d="M880 370 H855 C845 370 845 405 870 405 M980 370 H1005 C1015 370 1015 405 990 405" fill="none" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="915" y="432" width="30" height="32" fill="#111111"/><rect x="890" y="464" width="80" height="21" rx="6" fill="#111111"/>' +
          spk(685, 220, 1.05, '#F4C84A') + spk(1030, 260, 0.85, '#FFFFFF');
      }

      // SCENE 9 (fuji/dawn & default): GIANT CARNIVAL PRIZE WHEEL, OVERSIZED 3D DICE & COMIC ZINES
      return '<circle cx="940" cy="220" r="130" fill="#F4C84A" opacity=".35"/>' +
        floorPlane(640, '#F4E6CC') +
        bunting(50, 80, 600, 140, 1150, 80, 11) +
        // Left: Giant Floor-Standing Carnival Spinning Wheel!
        '<path d="M195 640 L290 365 L385 640" fill="none" stroke="#111111" stroke-width="10" stroke-linecap="round"/>' +
        '<circle cx="290" cy="355" r="155" fill="#111111"/>' +
        '<circle cx="290" cy="355" r="142" fill="#F4C84A" stroke="#FFFFFF" stroke-width="4"/>' +
        '<path d="M290 355 L290 213 A142 142 0 0 1 413 284 Z M290 355 L413 426 A142 142 0 0 1 290 497 Z M290 355 L167 426 A142 142 0 0 1 167 284 Z" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
        '<circle cx="290" cy="355" r="28" fill="#111111" stroke="#FFFFFF" stroke-width="4"/>' +
        '<path d="M275 185 H305 L290 222 Z" fill="#111111" stroke="#FFFFFF" stroke-width="3"/>' +
        // Center & Right: Game Creator Kid + Giant Dice & Comic Stand
        mogulKid(640, 450, { skin: '#8D5524', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'cap', armL: 'wave', armR: 'up' }) +
        '<rect x="500" y="485" width="580" height="24" rx="10" fill="#111111"/>' +
        '<rect x="525" y="509" width="530" height="131" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
        '<rect x="565" y="534" width="450" height="80" rx="12" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
        '<text x="790" y="584" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="32" fill="#111111">Games, Puzzles &amp; Comics</text>' +
        // Giant 3D Dice & Winner Trophy on Table
        '<rect x="755" y="395" width="86" height="86" rx="16" fill="#FFFFFF" stroke="#111111" stroke-width="5"/>' +
        '<circle cx="780" cy="420" r="8" fill="#111111"/><circle cx="816" cy="456" r="8" fill="#111111"/><circle cx="798" cy="438" r="8" fill="#F4C84A" stroke="#111111" stroke-width="3"/>' +
        '<rect x="858" y="415" width="66" height="66" rx="14" fill="#F4C84A" stroke="#111111" stroke-width="4.5"/>' +
        '<circle cx="878" cy="435" r="7" fill="#111111"/><circle cx="904" cy="461" r="7" fill="#111111"/>' +
        // Comic Book Display Rack
        '<rect x="945" y="365" width="95" height="116" rx="8" fill="#111111"/>' +
        '<rect x="957" y="377" width="71" height="48" rx="4" fill="#F4C84A"/>' +
        '<text x="992" y="407" text-anchor="middle" font-family="Outfit, sans-serif" font-size="14" font-weight="800" fill="#111111">COMICS</text>' +
        spk(520, 220, 1.0, '#F4C84A') + spk(1065, 280, 0.85, '#FFFFFF');
    },

    // =========================================================================
    // 6. SAVANNAH: GREEN, BOTANICAL PLANT LADDER & SUSTAINABLE IDEAS
    //    - dusk: "BOTANICAL A-FRAME PLANT LADDER, HANGING PLANTERS & ECO BENCH"
    //    - day/dawn: "UPCYCLED CRAFTS, SOLAR LANTERNS & RECYCled DESIGN STUDIO"
    // =========================================================================
    savannah: function (id, sky, c, time) {
      if (time === 'night') {
        // HARARE EVENT DAY PAVILION ("SATURDAY, 12 DECEMBER 2026 · 10:00 AM – 4:00 PM")
        return '<circle cx="600" cy="240" r="185" fill="#F4C84A" opacity=".32"/>' +
          floorPlane(640, '#F4E6CC') +
          bunting(40, 70, 600, 130, 1160, 70, 12) +
          // Grand Event Entrance Pavilion Arch
          '<path d="M190 640 V230 A410 170 0 0 1 1010 230 V640 H910 V275 A310 120 0 0 0 290 275 V640 Z" fill="#111111"/>' +
          '<rect x="310" y="135" width="580" height="72" rx="36" fill="#F4C84A" stroke="#111111" stroke-width="5"/>' +
          '<text x="600" y="180" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="32" fill="#111111">12 DEC 2026 · HARARE</text>' +
          '<rect x="390" y="220" width="420" height="42" rx="21" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
          '<text x="600" y="247" text-anchor="middle" font-family="Outfit, sans-serif" font-size="16" font-weight="800" letter-spacing="2.5" fill="#111111">10:00 AM – 4:00 PM · VENUE TBA</text>' +
          // Young Moguls welcoming visitors inside the Pavilion
          mogulKid(445, 455, { skin: '#7A4821', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'puffs', armL: 'wave', armR: 'up' }) +
          mogulKid(755, 455, { skin: '#8D5524', shirt: '#FFFFFF', apron: '#F4C84A', hair: 'cap', armL: 'up', armR: 'wave' }) +
          '<rect x="315" y="490" width="570" height="24" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="5"/>' +
          '<rect x="340" y="514" width="520" height="126" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="375" y="538" width="450" height="78" rx="12" fill="#111111"/>' +
          '<text x="600" y="587" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="30" fill="#F4C84A">Mini Moguls Market Day</text>' +
          spk(120, 260, 1.0, '#F4C84A') + spk(1080, 260, 1.0, '#F4C84A');
      }
      if (time === 'day' || time === 'dawn') {
        // SCENE 12: UPCYCLED CRAFTS, RECYCLED ART & SOLAR JAR WORKSHOP
        return '<circle cx="230" cy="210" r="125" fill="#F4C84A" opacity=".35"/>' +
          floorPlane(640, '#F4E6CC') +
          pillBadge(600, 95, 'SUSTAINABLE · UPCYCLED CRAFTS & ECO DESIGN', true) +
          // Hanging Glowing Solar Lantern Jars from Overhead Beam
          '<line x1="160" y1="145" x2="1040" y2="145" stroke="#111111" stroke-width="6" stroke-linecap="round"/>' +
          '<g transform="translate(260 145)"><line x1="0" y1="0" x2="0" y2="55" stroke="#111111" stroke-width="4"/><rect x="-28" y="55" width="56" height="72" rx="12" fill="#F4C84A" stroke="#111111" stroke-width="4"/><rect x="-20" y="43" width="40" height="12" rx="4" fill="#111111"/><circle cx="0" cy="91" r="14" fill="#FFFFFF"/></g>' +
          '<g transform="translate(600 145)"><line x1="0" y1="0" x2="0" y2="45" stroke="#111111" stroke-width="4"/><rect x="-28" y="45" width="56" height="72" rx="12" fill="#FFFFFF" stroke="#111111" stroke-width="4"/><rect x="-20" y="33" width="40" height="12" rx="4" fill="#111111"/><circle cx="0" cy="81" r="14" fill="#F4C84A"/></g>' +
          '<g transform="translate(940 145)"><line x1="0" y1="0" x2="0" y2="55" stroke="#111111" stroke-width="4"/><rect x="-28" y="55" width="56" height="72" rx="12" fill="#F4C84A" stroke="#111111" stroke-width="4"/><rect x="-20" y="43" width="40" height="12" rx="4" fill="#111111"/><circle cx="0" cy="91" r="14" fill="#FFFFFF"/></g>' +
          // Two Young Eco-Makers at Upcycling Bench
          mogulKid(445, 450, { skin: '#7A4821', shirt: '#111111', apron: '#F4C84A', hair: 'curly', armL: 'wave', armR: 'down' }) +
          mogulKid(755, 450, { skin: '#8D5524', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'puffs', armL: 'down', armR: 'up' }) +
          '<rect x="180" y="485" width="840" height="24" rx="10" fill="#111111"/>' +
          '<rect x="210" y="509" width="780" height="131" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
          '<rect x="360" y="534" width="480" height="80" rx="12" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          '<text x="600" y="584" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="32" fill="#111111">Upcycled &amp; Eco Creations</text>' +
          // Upcycled organizer bins & hand-painted bottles on table
          '<rect x="235" y="410" width="95" height="75" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
          '<path d="M265 448 L282 430 L300 448 L282 466 Z" fill="#111111"/>' +
          '<path d="M580 485 L588 405 H612 L620 485 Z" fill="#111111"/>' +
          '<circle cx="600" cy="390" r="16" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
          '<rect x="865" y="415" width="100" height="70" rx="10" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
          '<text x="915" y="456" text-anchor="middle" font-family="Outfit, sans-serif" font-size="15" font-weight="800" fill="#111111">RECYCLE</text>' +
          spk(430, 230, 0.9, '#F4C84A') + spk(780, 230, 0.9, '#FFFFFF');
      }
      return '<circle cx="930" cy="220" r="135" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
        floorPlane(640, '#F4E6CC') +
        // Overhead Wooden Pergola Beam with Hanging Planters
        '<rect x="80" y="95" width="1040" height="22" rx="8" fill="#111111"/>' +
        '<line x1="250" y1="117" x2="250" y2="185" stroke="#111111" stroke-width="4"/>' +
        '<path d="M215 185 H285 L273 230 H227 Z" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
        '<circle cx="235" cy="175" r="14" fill="#111111"/><circle cx="265" cy="175" r="14" fill="#111111"/><circle cx="250" cy="165" r="16" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
        '<line x1="580" y1="117" x2="580" y2="175" stroke="#111111" stroke-width="4"/>' +
        '<path d="M545 175 H615 L603 220 H557 Z" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
        '<circle cx="580" cy="160" r="18" fill="#111111"/>' +
        // Left: Multi-Tiered A-Frame Botanical Plant Ladder!
        '<path d="M130 640 L275 250 L420 640" fill="none" stroke="#111111" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<rect x="195" y="365" width="160" height="16" rx="6" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
        '<rect x="165" y="470" width="220" height="16" rx="6" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
        '<rect x="135" y="575" width="280" height="16" rx="6" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
        // Pots on A-Frame shelves
        '<path d="M245 315 H305 L295 365 H255 Z" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
        '<path d="M275 315 V270 M275 295 C245 290 245 265 275 265 C305 265 305 290 275 295 Z" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
        '<path d="M195 420 H255 L245 470 H205 Z" fill="#111111"/>' +
        '<circle cx="225" cy="405" r="20" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
        '<path d="M295 420 H355 L345 470 H305 Z" fill="#FFFFFF" stroke="#111111" stroke-width="4"/>' +
        '<circle cx="325" cy="405" r="20" fill="#111111"/>' +
        // Right: Young Eco-Entrepreneurs at Potting & Upcycling Bench
        mogulKid(645, 450, { skin: '#6F3E18', shirt: '#F4C84A', apron: '#FFFFFF', hair: 'locs', armL: 'wave', armR: 'down' }) +
        mogulKid(885, 450, { skin: '#8D5524', shirt: '#FFFFFF', apron: '#F4C84A', hair: 'puffs', armL: 'down', armR: 'up' }) +
        '<rect x="490" y="485" width="590" height="24" rx="10" fill="#F4C84A" stroke="#111111" stroke-width="5"/>' +
        '<rect x="515" y="509" width="540" height="131" fill="#FFFFFF" stroke="#111111" stroke-width="4.5"/>' +
        '<rect x="555" y="534" width="460" height="80" rx="12" fill="#111111"/>' +
        '<text x="785" y="584" text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="30" fill="#F4C84A">Green &amp; Sustainable Ideas</text>' +
        // Watering can & Terracotta Pots on Bench
        '<rect x="740" y="420" width="66" height="65" rx="10" fill="#111111"/>' +
        '<path d="M740 442 L700 408 M806 432 C828 432 828 468 806 468" fill="none" stroke="#111111" stroke-width="5" stroke-linecap="round"/>' +
        '<circle cx="696" cy="405" r="8" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/>' +
        spk(450, 250, 0.95, '#F4C84A') + spk(1080, 350, 0.85, '#FFFFFF');
    }
  };

  function art(scene, time, label, fit) {
    scene = SCENES[scene] ? scene : 'dunes';
    time = SKIES[time] ? time : 'day';
    var id = 'w' + (++artCount) + scene.charAt(0);
    var sky = SKIES[time];
    var c = LAYERS[scene][time];
    var a11y = label ? 'role="img" aria-label="' + esc(label) + '"' : 'aria-hidden="true"';
    var xform = fit === 'overlay'
      ? 'translate(600 315) scale(0.76) translate(-600 -365)'
      : 'translate(600 375) scale(0.84) translate(-600 -365)';
    return '<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" class="h-full w-full" ' + a11y + ' focusable="false">' +
      skyDefs(id, sky) + '<g transform="' + xform + '">' + SCENES[scene](id, sky, c, time) + '</g></svg>';
  }

  // Creator Journey Map: stylised Market Day board with numbered creator milestones in brand colours.
  function routeMap(tour) {
    var W = 800, H = 500;
    var pts = tour.stops.map(function (s) { return [s[0] / 100 * W, s[1] / 100 * H, s[2]]; });
    var d = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (var i = 1; i < pts.length; i++) {
      var p = pts[i - 1], q = pts[i];
      var mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2 - 26;
      d += ' Q' + mx + ' ' + my + ' ' + q[0] + ' ' + q[1];
    }
    var pins = pts.map(function (p, n) {
      var right = p[0] < W * 0.72;
      var tx = right ? p[0] + 28 : p[0] - 28;
      return '<g><circle cx="' + p[0] + '" cy="' + p[1] + '" r="19" fill="#F4C84A" stroke="#111111" stroke-width="4"/>' +
        '<text x="' + p[0] + '" y="' + (p[1] + 6) + '" text-anchor="middle" font-size="17" font-weight="800" fill="#111111" font-family="Outfit, sans-serif">' + (n + 1) + '</text>' +
        '<text x="' + tx + '" y="' + (p[1] + 6) + '" text-anchor="' + (right ? 'start' : 'end') + '" font-size="22" font-weight="700" fill="#111111" font-family="Outfit, sans-serif" paint-order="stroke" stroke="#FFF9EB" stroke-width="7" stroke-linejoin="round">' + esc(p[2]) + '</text></g>';
    }).join('');
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="h-full w-full" role="img" aria-label="Creator journey steps: ' + esc(tour.stops.map(function (s) { return s[2]; }).join(', ')) + '">' +
      '<defs><pattern id="map-dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="16" cy="16" r="2" fill="#111111" opacity=".08"/></pattern></defs>' +
      '<rect width="' + W + '" height="' + H + '" fill="#F4E6CC"/><rect width="' + W + '" height="' + H + '" fill="url(#map-dots)"/>' +
      '<path d="M40 70C140 20 300 40 420 30S660 10 760 70C800 140 770 220 790 300S770 450 680 480C560 500 420 470 300 486S90 480 50 400C20 320 60 260 30 190S10 100 40 70Z" fill="#FFF9EB" stroke="#111111" stroke-width="4"/>' +
      '<g fill="none" stroke="#F4C84A" stroke-width="3" stroke-dasharray="6 8" stroke-linecap="round"><path d="M120 140C220 110 330 150 430 120S640 110 700 160"/><path d="M100 260C220 230 330 280 460 250S650 240 740 290"/><path d="M110 380C230 350 360 400 480 370S640 380 720 410"/></g>' +
      '<path d="' + d + '" fill="none" stroke="#111111" stroke-width="5" stroke-dasharray="4 12" stroke-linecap="round"/>' + pins +
      '<g transform="translate(720 88)"><circle r="36" fill="#F4C84A" stroke="#111111" stroke-width="3.5"/><path d="M0-22C3-7 7-3 22 0C7 3 3 7 0 22C-3 7-7 3-22 0C-7-3-3-7 0-22Z" fill="#FFFFFF" stroke="#111111" stroke-width="3"/><text y="-44" text-anchor="middle" font-size="12" font-weight="800" letter-spacing="1.5" fill="#111111" font-family="Outfit, sans-serif">HARARE</text></g>' +
      '<text x="44" y="472" font-size="16" font-weight="600" fill="#555555" font-family="Outfit, sans-serif">Mini Moguls Market Day creator pathway · Saturday, 12 December 2026</text></svg>';
  }

  // Cohesive editorial avatars for mentors and young creators in the brand palette (#F4C84A, #111111, #FFFFFF, #FFF9EB).
  function avatar(spec, label) {
    var p = String(spec || '').split(',');
    var skin = p[0] || '#8D5524', style = p[2] || 'short';
    var hairShape = {
      short: '<path d="M30 46c0-22 14-32 30-32s30 10 30 32c-6-10-16-14-30-14s-24 4-30 14z" fill="#111111"/>',
      long: '<path d="M26 92V48c0-24 16-34 34-34s34 10 34 34v44H82V52c-6-10-12-14-22-14s-16 4-22 14v40z" fill="#111111"/>',
      bun: '<circle cx="60" cy="14" r="12" fill="#111111"/><circle cx="60" cy="22" r="5" fill="#F4C84A"/><path d="M30 48c0-22 14-32 30-32s30 10 30 32c-8-12-18-16-30-16s-22 4-30 16z" fill="#111111"/>',
      curly: '<g fill="#111111"><circle cx="36" cy="38" r="12"/><circle cx="50" cy="26" r="13"/><circle cx="68" cy="25" r="13"/><circle cx="84" cy="37" r="12"/><circle cx="60" cy="34" r="12"/></g>',
      bald: '<path d="M34 42c4-14 14-22 26-22s22 8 26 22c-6-8-15-12-26-12s-20 4-26 12z" fill="#111111"/>'
    }[style] || '';
    var a11y = label ? 'role="img" aria-label="' + esc(label) + '"' : 'aria-hidden="true"';
    return '<svg viewBox="0 0 120 120" class="h-full w-full" ' + a11y + ' focusable="false">' +
      '<rect width="120" height="120" fill="#F4C84A"/>' +
      '<circle cx="60" cy="60" r="52" fill="#FFF9EB" stroke="#111111" stroke-width="3.5"/>' +
      '<path d="M20 120c4-24 22-36 40-36s36 12 40 36z" fill="#111111"/>' +
      '<path d="M42 88L60 106L78 88" fill="none" stroke="#F4C84A" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M50 80h20v12a10 10 0 0 1-20 0z" fill="' + skin + '" stroke="#111111" stroke-width="3"/>' +
      '<ellipse cx="60" cy="54" rx="25" ry="29" fill="' + skin + '" stroke="#111111" stroke-width="3.5"/>' + hairShape +
      '<circle cx="50" cy="56" r="3" fill="#111111"/><circle cx="70" cy="56" r="3" fill="#111111"/>' +
      '<path d="M52 69q8 6 16 0" fill="none" stroke="#111111" stroke-width="3" stroke-linecap="round"/></svg>';
  }

  function paintArt(root) {
    $$('[data-art]', root).forEach(function (el) {
      if (el.firstElementChild) return;
      var hasOverlay = !!(el.parentElement && el.parentElement.querySelector('.absolute.bottom-3'));
      el.innerHTML = art(el.getAttribute('data-art'), el.getAttribute('data-time'), el.getAttribute('data-label'), hasOverlay ? 'overlay' : '');
    });
    $$('[data-avatar]', root).forEach(function (el) {
      if (el.firstElementChild) return;
      el.innerHTML = avatar(el.getAttribute('data-avatar'), el.getAttribute('data-label'));
    });
  }

  /* ------------------------------------------------------------------
   * 4. Departures and prices (demo data, worked out from each tour)
   * ------------------------------------------------------------------ */
  function departures(tour) {
    return [{
      start: '2026-12-12', end: '2026-12-12', month: 12,
      price: tour.price, peak: false,
      left: 8, guaranteed: true
    }];
  }
  function departureLabel() {
    return 'Sat, 12 Dec 2026 · 10:00 AM–4:00 PM';
  }
  function availability() {
    return { text: 'Harare · Venue TBA', cls: 'badge-ok' };
  }
  // The live price for an enquiry. room: 'share' or 'own'.
  function quote(tour, dep, travellers, room) {
    var n = Math.max(1, Math.min(MAX_TRAVELLERS, travellers | 0));
    var base = dep.price * n;
    var supplement = room === 'own' ? tour.single * n : 0;
    return { travellers: n, perPerson: dep.price, base: base, supplement: supplement, total: base + supplement, deposit: DEPOSIT * n };
  }

  /* ------------------------------------------------------------------
   * 5. Tour cards
   * ------------------------------------------------------------------ */
  function tourCard(t, opts) {
    opts = opts || {};
    var region = findRegion(t.region);
    var href = 'events.html?id=' + t.id + (opts.month ? '&month=' + opts.month : '');
    var heading = opts.heading || 'h3';
    return '<article class="tour-card group reveal">' +
      '<div class="relative">' +
        '<a href="' + href + '" class="art-frame block aspect-[4/3] rounded-[1.75rem]" tabindex="-1" aria-hidden="true">' + art(t.scene, t.time) + '</a>' +
        (t.badge ? '<span class="absolute left-4 top-4 rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink shadow-sm">' + esc(t.badge) + '</span>' : '') +
        '<span class="stamp absolute -bottom-5 right-5 rotate-3"><span class="stamp-inner"><span class="block font-display text-2xl leading-none">12 Dec</span><span class="mt-0.5 block text-[0.6rem] font-semibold uppercase tracking-[0.18em]">Harare</span></span></span>' +
      '</div>' +
      '<div class="flex flex-1 flex-col px-1 pt-6">' +
        '<p class="text-xs font-semibold uppercase tracking-[0.2em] text-clay">' + esc(region ? region.label : t.country) + ' · ' + esc(styleLabel(t.style)) + '</p>' +
        '<' + heading + ' class="mt-2 font-display text-2xl leading-tight text-ink"><a href="' + href + '" class="tour-link">' + esc(t.name) + '</a></' + heading + '>' +
        '<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">' + esc(t.summary) + '</p>' +
        '<div class="mt-auto flex items-end justify-between gap-4 pt-5">' +
          '<div class="text-sm text-muted"><span class="flex items-center gap-2">' + stars(5) + '<span><span class="font-semibold text-ink">CREATE</span> · SELL · LEARN</span></span>' +
          '<span class="mt-1 block">Showcase: ' + esc(t.level) + '</span></div>' +
          '<p class="shrink-0 text-right text-sm text-muted">entry<span class="block font-display text-2xl leading-none text-ink">' + money(t.price) + '</span><span class="sr-only"> public admission, ' + (region ? esc(region.label) : '') + '</span></p>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function initFeatured() {
    var host = $('[data-featured-tours]');
    if (!host) return;
    var list = TOURS.filter(function (t) { return t.featured; }).sort(function (a, b) { return a.featured - b.featured; });
    host.innerHTML = list.map(function (t) { return tourCard(t); }).join('');
  }

  // data-tour-list="id,id" renders those tours (article and journal pages).
  function initTourLists() {
    $$('[data-tour-list]').forEach(function (host) {
      var ids = host.getAttribute('data-tour-list').split(',');
      host.innerHTML = ids.map(findTour).filter(Boolean).map(function (t) { return tourCard(t, { heading: host.getAttribute('data-heading') || 'h3' }); }).join('');
    });
  }

  // data-region-count="arts-crafts" shows how many trips a region has.
  function initRegionCounts() {
    $$('[data-region-count]').forEach(function (el) {
      var n = TOURS.filter(function (t) { return t.region === el.getAttribute('data-region-count'); }).length;
      el.textContent = plural(n, 'showcase', 'showcases');
    });
  }

  /* ------------------------------------------------------------------
   * 6. Trip finder (home page): sends its choices to experience.html as URL params
   * ------------------------------------------------------------------ */
  function initFinder() {
    var form = $('#trip-finder');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var params = new URLSearchParams();
      ['region', 'month', 'style', 'duration'].forEach(function (name) {
        var v = form.elements[name] && form.elements[name].value;
        if (v) params.set(name, v);
      });
      var q = params.toString();
      window.location.href = 'experience.html' + (q ? '?' + q : '');
    });
  }

  /* ------------------------------------------------------------------
   * 7. Tours page: filters, sort, result count and URL
   *    experience.html?region=arts-crafts,games-fun&style=hiking&duration=medium&month=5&max=3000&sort=price-asc
   * ------------------------------------------------------------------ */
  var SORTS = {
    recommended: function (a, b) { return (a.featured || 99) - (b.featured || 99) || b.rating - a.rating; },
    'price-asc': function (a, b) { return a.name.localeCompare(b.name); },
    'price-desc': function (a, b) { return b.name.localeCompare(a.name); },
    'days-asc': function (a, b) { return a.days - b.days || a.price - b.price; },
    rating: function (a, b) { return b.rating - a.rating || b.reviews - a.reviews; }
  };

  function readList(params, name, allowed) {
    var out = [];
    params.getAll(name).join(',').toLowerCase().split(',').forEach(function (v) {
      v = v.trim();
      if (allowed.indexOf(v) > -1 && out.indexOf(v) < 0) out.push(v);
    });
    return out;
  }
  function ids(list) { return list.map(function (x) { return x.id; }); }

  function readState(search) {
    var params = new URLSearchParams(search);
    var month = parseInt(params.get('month'), 10);
    var max = parseInt(params.get('max'), 10);
    var sort = (params.get('sort') || '').toLowerCase();
    return {
      region: readList(params, 'region', ids(REGIONS)),
      style: readList(params, 'style', ids(STYLES)),
      duration: readList(params, 'duration', ids(DURATIONS)),
      month: month >= 1 && month <= 12 ? month : 0,
      max: max >= PRICE_MIN && max < PRICE_MAX ? max : PRICE_MAX,
      sort: SORTS[sort] ? sort : 'recommended'
    };
  }
  function matches(t, s) {
    if (s.region.length && s.region.indexOf(t.region) < 0) return false;
    if (s.style.length && s.style.indexOf(t.style) < 0) return false;
    if (s.duration.length && s.duration.indexOf(durationOf(t.days).id) < 0) return false;
    if (s.month && t.months.indexOf(s.month) < 0) return false;
    if (t.price > s.max) return false;
    return true;
  }
  function filterTours(s) { return TOURS.filter(function (t) { return matches(t, s); }).sort(SORTS[s.sort]); }

  function initTours() {
    var form = $('#tour-filters');
    var grid = $('#tour-grid');
    if (!form || !grid) return;
    var count = $('#result-count');
    var empty = $('#tour-empty');
    var chips = $('#active-filters');
    var sortSel = $('#sort');
    var range = form.elements.max;
    var rangeOut = $('#max-output');
    var state = readState(window.location.search);

    function toForm() {
      $$('input[type="checkbox"]', form).forEach(function (cb) { cb.checked = (state[cb.name] || []).indexOf(cb.value) > -1; });
      form.elements.month.value = state.month ? String(state.month) : '';
      range.value = state.max;
      sortSel.value = state.sort;
    }
    function fromForm() {
      ['region', 'style', 'duration'].forEach(function (name) {
        state[name] = $$('input[name="' + name + '"]:checked', form).map(function (cb) { return cb.value; });
      });
      state.month = parseInt(form.elements.month.value, 10) || 0;
      state.max = parseInt(range.value, 10) || PRICE_MAX;
      state.sort = SORTS[sortSel.value] ? sortSel.value : 'recommended';
    }
    function writeURL() {
      var p = new URLSearchParams();
      ['region', 'style', 'duration'].forEach(function (n) { if (state[n].length) p.set(n, state[n].join(',')); });
      if (state.month) p.set('month', state.month);
      if (state.max < PRICE_MAX) p.set('max', state.max);
      if (state.sort !== 'recommended') p.set('sort', state.sort);
      var q = p.toString().replace(/%2C/g, ',');
      history.replaceState(null, '', window.location.pathname + (q ? '?' + q : '') + window.location.hash);
    }
    function label(group, id) {
      if (group === 'region') return findRegion(id).label;
      if (group === 'style') return styleLabel(id);
      return byId(DURATIONS, id).label;
    }
    function render() {
      var list = filterTours(state);
      grid.innerHTML = list.map(function (t) { return tourCard(t, { month: state.month, heading: 'h2' }); }).join('');
      paintArt(grid);
      revealNow(grid);
      count.textContent = list.length === TOURS.length && !hasFilters()
        ? 'Showing all ' + TOURS.length + ' showcases'
        : plural(list.length, 'showcase matches', 'showcases match') + ' your filters';
      empty.hidden = list.length > 0;
      grid.hidden = list.length === 0;
      rangeOut.textContent = state.max >= PRICE_MAX ? 'US$5 per person' : 'Up to ' + money(state.max);
      // Counts next to each option: how many trips you'd see if you ticked it, given the other filters.
      $$('[data-count-for]', form).forEach(function (el) {
        var parts = el.getAttribute('data-count-for').split(':');
        var probe = JSON.parse(JSON.stringify(state));
        probe[parts[0]] = [parts[1]];
        el.textContent = TOURS.filter(function (t) { return matches(t, probe); }).length;
      });
      var html = '';
      ['region', 'style', 'duration'].forEach(function (g) {
        state[g].forEach(function (id) {
          html += '<li><button type="button" class="filter-chip" data-remove="' + g + ':' + id + '">' + esc(label(g, id)) + '<span class="sr-only">, remove filter</span><svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></li>';
        });
      });
      if (state.month) html += '<li><button type="button" class="filter-chip" data-remove="month">' + MONTHS[state.month - 1] + '<span class="sr-only">, remove filter</span><svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></li>';
      if (state.max < PRICE_MAX) html += '<li><button type="button" class="filter-chip" data-remove="max">Up to ' + money(state.max) + '<span class="sr-only">, remove filter</span><svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></li>';
      chips.innerHTML = html;
      chips.parentElement.hidden = !html;
      var badge = $('#filter-count');
      var n = state.region.length + state.style.length + state.duration.length + (state.month ? 1 : 0) + (state.max < PRICE_MAX ? 1 : 0);
      if (badge) { badge.textContent = n; badge.hidden = !n; }
    }
    function hasFilters() { return state.region.length || state.style.length || state.duration.length || state.month || state.max < PRICE_MAX; }
    function reset() {
      state = readState('?sort=' + state.sort);
      toForm(); writeURL(); render();
    }

    form.addEventListener('change', function () { fromForm(); writeURL(); render(); });
    range.addEventListener('input', function () { fromForm(); render(); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    sortSel.addEventListener('change', function () { fromForm(); writeURL(); render(); });
    chips.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-remove]');
      if (!btn) return;
      var parts = btn.getAttribute('data-remove').split(':');
      if (parts[0] === 'month') state.month = 0;
      else if (parts[0] === 'max') state.max = PRICE_MAX;
      else state[parts[0]] = state[parts[0]].filter(function (v) { return v !== parts[1]; });
      toForm(); writeURL(); render();
      var next = $('[data-remove]', chips);
      (next || $('#result-count')).focus();
    });
    $$('[data-reset-filters]').forEach(function (b) { b.addEventListener('click', function () { reset(); count.focus(); }); });

    var toggle = $('#filters-toggle');
    var panel = $('#filters-panel');
    if (toggle && panel) {
      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(open));
        panel.classList.toggle('max-lg:hidden', !open);
      });
    }

    toForm();
    writeURL();
    render();
  }

  /* ------------------------------------------------------------------
   * 8. Tour page: events.html?id=handmade-crafts-art (&month=5 picks the first departure that month)
   * ------------------------------------------------------------------ */
  function initTourPage() {
    var root = $('[data-tour-page]');
    if (!root) return;
    var params = new URLSearchParams(window.location.search);
    var tour = findTour(params.get('id')) || TOURS[0];
    var region = findRegion(tour.region);
    var deps = departures(tour, 8);

    document.title = tour.name + ' — Showcase | Mini Moguls Market Day';
    var meta = $('meta[name="description"]');
    if (meta) meta.setAttribute('content', tour.summary);

    function set(name, value) { $$('[data-tour="' + name + '"]').forEach(function (el) { el.textContent = value; }); }
    set('name', tour.name);
    set('summary', tour.summary);
    set('region', region.label);
    set('country', tour.country);
    set('days', '10:00 AM–4:00 PM');
    set('style', styleLabel(tour.style));
    set('level', tour.level);
    set('group', 'Solo or team');
    set('price', money(tour.price));
    set('rating', 'CREATE');
    set('reviews', 'SELL · LEARN');
    set('single', 'Enquire');
    set('deposit', 'TBA');
    $$('[data-tour-link="region"]').forEach(function (a) { a.href = 'experience.html?region=' + region.id; });
    $$('[data-tour-link="contact"]').forEach(function (a) { a.href = 'contact.html?tour=' + tour.id; });
    $$('[data-tour-stars]').forEach(function (el) { el.innerHTML = stars(tour.rating); });

    var hero = $('[data-tour-art]');
    if (hero) hero.innerHTML = art(tour.scene, tour.time, tour.name + ': illustrated landscape');
    var map = $('[data-tour-map]');
    if (map) map.innerHTML = routeMap(tour);
    var hl = $('[data-tour-highlights]');
    if (hl) hl.innerHTML = tour.highlights.map(function (h) {
      return '<li class="flex gap-3"><svg viewBox="0 0 24 24" class="mt-0.5 h-5 w-5 shrink-0 text-sun-deep" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 6.6L21 9l-5.2 4.3L17.6 21 12 17.2 6.4 21l1.8-7.7L3 9l6.6-.4z"/></svg><span>' + esc(h) + '</span></li>';
    }).join('');
    var tick = '<svg viewBox="0 0 24 24" class="mt-0.5 h-5 w-5 shrink-0 text-sea" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
    var cross = '<svg viewBox="0 0 24 24" class="mt-0.5 h-5 w-5 shrink-0 text-clay" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>';
    var inc = $('[data-tour-included]');
    if (inc) inc.innerHTML = tour.includes.concat(INCLUDED).map(function (x) { return '<li class="flex gap-3">' + tick + '<span>' + esc(x) + '</span></li>'; }).join('');
    var exc = $('[data-tour-excluded]');
    if (exc) exc.innerHTML = EXCLUDED.concat(tour.excludes).map(function (x) { return '<li class="flex gap-3">' + cross + '<span>' + esc(x) + '</span></li>'; }).join('');

    // Related trips: same region first, then same style.
    var rel = $('[data-related]');
    if (rel) {
      var score = function (t) { return (t.region === tour.region ? 2 : 0) + (t.style === tour.style ? 1 : 0); };
      rel.innerHTML = TOURS.filter(function (t) { return t.id !== tour.id; })
        .sort(function (a, b) { return score(b) - score(a) || b.rating - a.rating; })
        .slice(0, 3).map(function (t) { return tourCard(t); }).join('');
    }

    // Itinerary accordion
    var it = $('[data-itinerary]');
    if (it) {
      it.innerHTML = tour.itinerary.map(function (day, i) {
        var id = 'day-' + i;
        return '<li class="itinerary-item">' +
          '<h3><button type="button" class="itinerary-btn" aria-expanded="' + (i === 0) + '" aria-controls="' + id + '">' +
          '<span class="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-4"><span class="itinerary-day">Step ' + esc(day.d) + '</span><span class="text-left font-display text-xl leading-snug sm:text-2xl">' + esc(day.t) + '</span></span>' +
          '<svg viewBox="0 0 24 24" class="itinerary-icon h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></h3>' +
          '<div id="' + id + '" class="itinerary-panel"' + (i === 0 ? '' : ' hidden') + '><p>' + esc(day.x) + '</p>' +
          (day.stay ? '<p class="mt-3 flex items-center gap-2 text-sm text-muted"><svg viewBox="0 0 24 24" class="h-4 w-4 text-sea" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20V9l9-5 9 5v11M9 20v-6h6v6"/></svg>Focus: ' + esc(day.stay) + '</p>' : '') +
          '</div></li>';
      }).join('');
      var all = $('[data-itinerary-all]');
      function sync() {
        var btns = $$('.itinerary-btn', it);
        var allOpen = btns.every(function (b) { return b.getAttribute('aria-expanded') === 'true'; });
        if (all) { all.textContent = allOpen ? 'Collapse all steps' : 'Expand all steps'; all.setAttribute('aria-expanded', String(allOpen)); }
      }
      function setOpen(btn, open) {
        btn.setAttribute('aria-expanded', String(open));
        document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
      }
      it.addEventListener('click', function (e) {
        var btn = e.target.closest('.itinerary-btn');
        if (!btn) return;
        setOpen(btn, btn.getAttribute('aria-expanded') !== 'true');
        sync();
      });
      if (all) all.addEventListener('click', function () {
        var open = all.getAttribute('aria-expanded') !== 'true';
        $$('.itinerary-btn', it).forEach(function (b) { setOpen(b, open); });
        sync();
      });
      sync();
    }

    // Departures table
    var tbody = $('[data-departures]');
    if (tbody) {
      tbody.innerHTML = deps.map(function (dep) {
        var a = availability(dep);
        return '<tr data-dep="' + dep.start + '">' +
          '<th scope="row" class="py-4 pr-4 text-left font-medium">' + departureLabel(dep) + (dep.peak ? '<span class="ml-2 rounded-full bg-sun/30 px-2 py-0.5 text-xs font-semibold text-ink">Peak</span>' : '') + '</th>' +
          '<td class="py-4 pr-4"><span class="badge ' + a.cls + '">' + a.text + '</span></td>' +
          '<td class="py-4 pr-4 text-right font-display text-xl">' + money(dep.price) + '<span class="sr-only"> per person</span></td>' +
          '<td class="py-4 text-right">' + (dep.left ? '<button type="button" class="btn-small" data-pick="' + dep.start + '">Choose<span class="sr-only"> ' + departureLabel(dep) + '</span></button>' : '<span class="text-sm text-muted">Waitlist</span>') + '</td></tr>';
      }).join('');
    }

    // Booking widget: departure + travellers + room → live total
    var widget = $('#booking-widget');
    if (!widget) return;
    var sel = $('#dep-select', widget);
    var out = $('#trav-count', widget);
    var minus = $('[data-step="-1"]', widget);
    var plus = $('[data-step="1"]', widget);
    sel.innerHTML = deps.map(function (dep) {
      return '<option value="' + dep.start + '"' + (dep.left ? '' : ' disabled') + '>' + esc(departureLabel(dep)) + ' · ' + (dep.left ? money(dep.price) : 'Full') + '</option>';
    }).join('');
    var open = deps.filter(function (d) { return d.left; });
    var wanted = params.get('date');
    var month = parseInt(params.get('month'), 10);
    var first = open.filter(function (d) { return d.start === wanted; })[0] ||
      open.filter(function (d) { return d.month === month; })[0] || open[0];
    var travellers = Math.max(1, Math.min(MAX_TRAVELLERS, parseInt(params.get('travellers'), 10) || 2));
    if (first) sel.value = first.start;

    function current() { return deps.filter(function (d) { return d.start === sel.value; })[0] || first; }
    function update() {
      var dep = current();
      if (!dep) return;
      var max = Math.min(MAX_TRAVELLERS, dep.left);
      travellers = Math.max(1, Math.min(max, travellers));
      var room = (widget.querySelector('input[name="room"]:checked') || {}).value || 'share';
      var q = quote(tour, dep, travellers, room);
      out.textContent = travellers;
      minus.disabled = travellers <= 1;
      plus.disabled = travellers >= max;
      $('[data-q="pp"]', widget).textContent = money(q.perPerson) + ' × ' + q.travellers;
      $('[data-q="base"]', widget).textContent = money(q.base);
      $('[data-q="supp-row"]', widget).hidden = !q.supplement;
      $('[data-q="supp"]', widget).textContent = money(q.supplement);
      $('[data-q="total"]', widget).textContent = money(q.total);
      $('[data-q="deposit"]', widget).textContent = 'TBA';
      $('[data-q="note"]', widget).textContent = 'Saturday, 12 December 2026 · 10:00 AM–4:00 PM · Harare (Venue TBA).';
      $$('[data-dep]', tbody).forEach(function (r) { r.classList.toggle('is-selected', r.getAttribute('data-dep') === dep.start); });
      var sum = $('[data-enquiry-summary]');
      if (sum) sum.textContent = tour.name + ' · ' + departureLabel(dep) + ' · ' + plural(q.travellers, 'participant', 'participants') + (room === 'own' ? ', creator table enquiry' : ', public admission (US$5 pp, subject to confirmation)');
      var form = $('#enquiry-form');
      if (form) {
        form.elements.tour.value = tour.name;
        form.elements.departure.value = dep.start;
        form.elements.travellers.value = q.travellers;
        form.elements.room.value = room;
        form.elements.total.value = q.total;
      }
      var mbar = $('[data-mobile-price]');
      if (mbar) mbar.textContent = money(q.total);
    }
    sel.addEventListener('change', update);
    widget.addEventListener('change', function (e) { if (e.target.name === 'room') update(); });
    minus.addEventListener('click', function () { travellers--; update(); });
    plus.addEventListener('click', function () { travellers++; update(); });
    if (tbody) tbody.addEventListener('click', function (e) {
      var b = e.target.closest('[data-pick]');
      if (!b) return;
      sel.value = b.getAttribute('data-pick');
      update();
      widget.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      sel.focus({ preventScroll: true });
      toast('Event date ' + departureLabel(current()) + ' selected');
    });
    update();
  }

  /* ------------------------------------------------------------------
   * 9. Destinations: month-by-month seasonality
   * ------------------------------------------------------------------ */
  function initSeasons() {
    var table = $('#season-table');
    if (table) {
      var head = '<thead><tr><th scope="col" class="season-corner">Category</th>' + MONTHS.map(function (m) {
        return '<th scope="col" class="season-month"><abbr title="' + m + '">' + m.slice(0, 3) + '</abbr></th>';
      }).join('') + '</tr></thead>';
      var body = '<tbody>' + REGIONS.map(function (r) {
        return '<tr><th scope="row" class="season-region"><a href="#' + r.id + '" class="tour-link">' + esc(r.label) + '</a></th>' + r.season.map(function (v, i) {
          return '<td class="season-cell" data-level="' + v + '"><span class="season-dot" aria-hidden="true"></span><span class="sr-only">' + MONTHS[i] + ': ' + SEASON_LABEL[v] + '</span></td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody>';
      var cap = $('caption', table);
      table.innerHTML = (cap ? cap.outerHTML : '') + head + body;
    }
    $$('[data-season]').forEach(function (el) {
      var r = findRegion(el.getAttribute('data-season'));
      if (!r) return;
      var best = r.season.map(function (v, i) { return v === 3 ? MONTHS[i] : null; }).filter(Boolean);
      el.innerHTML = '<ol class="season-bar" aria-label="Preparation timeline for ' + esc(r.label) + ', by month">' + r.season.map(function (v, i) {
        return '<li class="season-step" data-level="' + v + '"><span class="season-fill" style="--h:' + ((v + 1) * 25) + '%"></span><span class="season-label" aria-hidden="true">' + MONTHS[i].charAt(0) + '</span><span class="sr-only">' + MONTHS[i] + ': ' + SEASON_LABEL[v] + '</span></li>';
      }).join('') + '</ol><p class="mt-3 text-sm text-muted"><span class="font-semibold text-ink">Market Day:</span> ' + esc(best.join(', ')) + '</p>';
    });
  }

  /* ------------------------------------------------------------------
   * 10. Journal topic filter: partners.html?topic=guides
   * ------------------------------------------------------------------ */
  function initJournal() {
    var bar = $('[data-topic-filter]');
    if (!bar) return;
    var posts = $$('[data-topic]');
    var status = $('#journal-status');
    var buttons = $$('button[data-topic-btn]', bar);
    var allowed = buttons.map(function (b) { return b.getAttribute('data-topic-btn'); });
    function apply(topic, push) {
      if (allowed.indexOf(topic) < 0) topic = 'all';
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-topic-btn') === topic)); });
      var shown = 0;
      posts.forEach(function (p) {
        var on = topic === 'all' || p.getAttribute('data-topic') === topic;
        p.hidden = !on;
        if (on) shown++;
      });
      if (status) status.textContent = topic === 'all' ? 'Showing all ' + shown + ' guides' : 'Showing ' + plural(shown, 'guide', 'guides') + ' in ' + $('[data-topic-btn="' + topic + '"]', bar).textContent.trim();
      if (push) history.replaceState(null, '', window.location.pathname + (topic === 'all' ? '' : '?topic=' + topic));
      revealNow(document);
    }
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-topic-btn]');
      if (b) apply(b.getAttribute('data-topic-btn'), true);
    });
    apply((new URLSearchParams(window.location.search).get('topic') || 'all').toLowerCase(), false);
  }

  /* ------------------------------------------------------------------
   * 11. Forms: inline validation and a success state. Nothing is sent until you connect them.
   *     To connect a form, see onValid() below and DOCS.md (Forms).
   * ------------------------------------------------------------------ */
  function setFieldError(field, msg) {
    var err = document.getElementById(field.id + '-error');
    if (msg) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid');
    if (err) err.textContent = msg;
  }
  function fieldMessage(f) {
    var name = f.getAttribute('data-label') || 'this field';
    if (f.type === 'checkbox') return f.required && !f.checked ? (f.getAttribute('data-msg') || 'Please tick this box.') : '';
    var v = f.value.trim();
    if (f.required && !v) {
      if (f.type === 'email') return 'Enter your email address.';
      if (f.tagName === 'SELECT') return 'Choose ' + name + '.';
      return 'Enter ' + name + '.';
    }
    if (!v) return '';
    if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email address, like name@example.com.';
    if (f.type === 'tel' && !/^[+()\d\s-]{7,20}$/.test(v)) return 'Enter a phone number using digits, spaces, + or -.';
    if (f.minLength > 0 && v.length < f.minLength) return 'Please write at least ' + f.minLength + ' characters.';
    return '';
  }

  // Called when a form passes validation. Until you connect it, it only shows the success state.
  // To send for real, post the form first, for example:
  //   fetch('https://formspree.io/f/your-id', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
  //     .then(function (res) { if (res.ok) showSuccess(form); else toast('Something went wrong. Please email us.'); });
  function onValid(form) {
    showSuccess(form);
  }
  // A short reference for the confirmation, like SJ-7K2Q (no 0/O or 1/I to misread).
  function makeRef(prefix) {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', out = '';
    for (var i = 0; i < 4; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
    return prefix + '-' + out;
  }
  function showSuccess(form) {
    var box = document.getElementById(form.getAttribute('data-success'));
    var first = (form.elements.name && form.elements.name.value.trim().split(/\s+/)[0]) || '';
    if (box) {
      $$('[data-first-name]', box).forEach(function (el) { el.textContent = first ? ', ' + first : ''; });
      var sum = $('[data-enquiry-summary]');
      $$('[data-success-summary]', box).forEach(function (el) { el.textContent = sum ? sum.textContent : ''; });
      var ref = makeRef('MM');
      $$('[data-ref]', box).forEach(function (el) { el.textContent = ref; });
      box.hidden = false;
      form.hidden = true;
      box.setAttribute('tabindex', '-1');
      box.focus();
    }
    form.reset();
  }
  function initForms() {
    $$('form[data-validate]').forEach(function (form) {
      var fields = $$('input:not([type="hidden"]), textarea, select', form).filter(function (f) {
        return f.required || f.type === 'email' || f.type === 'tel' || f.minLength > 0;
      });
      fields.forEach(function (f) {
        f.addEventListener('blur', function () { if (f.value || f.getAttribute('aria-invalid')) setFieldError(f, fieldMessage(f)); });
        f.addEventListener(f.type === 'checkbox' || f.tagName === 'SELECT' ? 'change' : 'input', function () {
          if (f.getAttribute('aria-invalid') === 'true') setFieldError(f, fieldMessage(f));
        });
      });
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var bad = fields.filter(function (f) { var m = fieldMessage(f); setFieldError(f, m); return !!m; });
        if (bad.length) { bad[0].focus(); return; }
        onValid(form);
      });
    });
    $$('[data-form-again]').forEach(function (b) {
      b.addEventListener('click', function () {
        var box = b.closest('[data-success-box]');
        var form = $('form[data-success="' + box.id + '"]');
        box.hidden = true;
        form.hidden = false;
        var first = $('input:not([type="hidden"]), textarea, select', form);
        if (first) first.focus();
        // The tour page's enquiry form carries the booking summary in hidden fields: refill them.
        var sel = $('#dep-select');
        if (sel) sel.dispatchEvent(new Event('change'));
      });
    });

    // contact.html?tour=<id> preselects the trip in the contact form.
    var trip = $('#contact-trip');
    if (trip) {
      trip.innerHTML = '<option value="">Not sure yet</option>' + REGIONS.map(function (r) {
        return '<optgroup label="' + esc(r.label) + '">' + TOURS.filter(function (t) { return t.region === r.id; }).map(function (t) {
          return '<option value="' + t.id + '">' + esc(t.name) + '</option>';
        }).join('') + '</optgroup>';
      }).join('');
      var wanted = findTour(new URLSearchParams(window.location.search).get('tour'));
      if (wanted) { trip.value = wanted.id; var topic = $('#contact-topic'); if (topic) topic.value = 'trip'; }
    }
  }

  /* ------------------------------------------------------------------
   * 12. Header, mobile menu, scroll reveal, reading progress, year
   * ------------------------------------------------------------------ */
  var io = null;
  function revealNow(root) {
    $$('.reveal:not(.is-visible)', root).forEach(function (el) {
      if (!io) { el.classList.add('is-visible'); return; }
      io.observe(el);
    });
  }
  function initChrome() {
    var menuBtn = $('#menu-toggle');
    var menu = $('#mobile-menu');
    function setMenu(open) {
      menuBtn.setAttribute('aria-expanded', String(open));
      $('.sr-only', menuBtn).textContent = open ? 'Close menu' : 'Menu';
      menu.hidden = !open;
      $('[data-icon-open]', menuBtn).classList.toggle('hidden', open);
      $('[data-icon-close]', menuBtn).classList.toggle('hidden', !open);
      document.documentElement.classList.toggle('menu-open', open);
    }
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
      });
      window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
    }

    var header = $('#site-header');
    var progress = $('[data-read-progress]');
    var article = $('[data-article]');
    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      if (progress && article) {
        var r = article.getBoundingClientRect();
        var total = r.height - window.innerHeight;
        var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
        progress.style.transform = 'scaleX(' + p + ')';
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    // Reveal on scroll. Revealing an element also reveals everything above it,
    // so fast jumps (End key, anchors) never leave content hidden.
    if (!('IntersectionObserver' in window) || reduceMotion) { $$('.reveal').forEach(function (el) { el.classList.add('is-visible'); }); return; }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var bottom = en.target.getBoundingClientRect().bottom;
        $$('.reveal:not(.is-visible)').forEach(function (el) { if (el.getBoundingClientRect().top <= bottom) { el.classList.add('is-visible'); io.unobserve(el); } });
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    $$('.reveal').forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 70 + 'ms'; io.observe(el); });
  }

  initFeatured();
  initTourLists();
  initRegionCounts();
  initTourPage();
  initTours();
  initSeasons();
  paintArt(document);
  initChrome();
  initFinder();
  initJournal();
  initForms();

  // Exposed for tests and debugging.
  window.Saltwind = { TOURS: TOURS, REGIONS: REGIONS, departures: departures, quote: quote, readState: readState, filterTours: filterTours };
})();

/* ---------- Back to top ----------
   A button that fades in after you scroll about one screen down. It returns to
   the top (instantly if the visitor prefers reduced motion) and moves keyboard
   focus to the main content. It lifts itself above toasts and the mobile booking
   bar so they never overlap. Mark your own UI with data-back-to-top-avoid.
   To remove the button: delete this block and the .back-to-top styles in src/input.css. */
(function () {
  'use strict';
  if (document.querySelector('.back-to-top')) return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.title = 'Back to top';
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  document.body.appendChild(btn);

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var AVOID = '#toast.is-visible, [data-back-to-top-avoid]';
  var queued = false;

  function lift() {
    var offset = 0;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    Array.prototype.forEach.call(document.querySelectorAll(AVOID), function (el) {
      var r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      if (r.bottom > vh - 140 && r.right > vw - 96 && r.top < vh) offset = Math.max(offset, vh - r.top + 8);
    });
    btn.style.setProperty('--btt-lift', offset + 'px');
  }
  function update() {
    queued = false;
    var menuOpen = document.documentElement.classList.contains('menu-open');
    btn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.9 && !menuOpen);
    lift();
  }
  function schedule() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(update);
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  document.addEventListener('transitionend', function (e) { if (e.target !== btn) schedule(); }, true);
  update();

  function focusTop() {
    var target = document.getElementById('main') || document.querySelector('main');
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.classList.add('back-to-top-target');
    target.focus({ preventScroll: true });
  }
  btn.addEventListener('click', function () {
    if (reduceMotion.matches) { window.scrollTo({ top: 0, behavior: 'auto' }); focusTop(); return; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      window.removeEventListener('scrollend', finish);
      focusTop();
    }
    if ('onscrollend' in window) window.addEventListener('scrollend', finish);
    window.setTimeout(finish, 1500);
  });
})();
