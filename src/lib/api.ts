type Delay = (ms?: number) => Promise<void>;
const delay: Delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

const safeFetch = async (path: string, opts?: RequestInit) => {
  try {
    const res = await fetch(path, opts);
    if (!res.ok) throw new Error('Network response not ok');
    return res.json();
  } catch (e) {
    // Caller will handle fallback mock data
    throw e;
  }
};

// --- Mock data ---
const mock = {
  chatRooms: [
    { id: 1, name: 'General Support', description: 'General discussion and support', members: 245, lastMessage: 'Welcome to our community!', unread: 3 },
    { id: 2, name: 'Accessibility Tech', description: 'Discuss assistive technologies', members: 189, lastMessage: 'New screen reader update available', unread: 0 },
    { id: 3, name: 'Job Seekers', description: 'Employment opportunities and tips', members: 156, lastMessage: 'Interview tips shared', unread: 1 }
  ],
  messages: {
    1: [
      { id: 1, user: 'Sarah M.', avatar: '/placeholder.svg', message: 'Welcome everyone! Feel free to introduce yourselves.', time: '2 min ago', type: 'text' },
      { id: 2, user: 'Alex K.', avatar: '/placeholder.svg', message: "Hi! I'm new here. Looking forward to connecting with everyone.", time: '5 min ago', type: 'text' }
    ]
  },
  posts: [
    { id: 1, title: 'Tips for Using Screen Readers Effectively', author: 'John D.', avatar: '/placeholder.svg', content: "Here are some advanced tips...", time: '2 hours ago', replies: 12, likes: 35, tags: ['Screen Readers', 'Tips'] },
    { id: 2, title: 'Job Interview Success Story', author: 'Emma L.', avatar: '/placeholder.svg', content: "I wanted to share my recent interview experience...", time: '1 day ago', replies: 8, likes: 28, tags: ['Jobs', 'Interviews'] }
  ],
  jobs: [
    { id: 1, title: 'Accessibility Consultant', company: 'TechCorp Inc.', location: 'Remote', salary: '$65,000 - $85,000', type: 'Full-time', posted: '2 days ago', description: 'Help organizations improve digital accessibility and WCAG compliance.', requirements: ['WCAG knowledge', 'Screen reader testing'], accessibility: ['Visual impairments welcome', 'Flexible work arrangements'] },
    { id: 2, title: 'UX Designer (Inclusive Design)', company: 'Design Studio', location: 'New York, NY', salary: '$70,000 - $90,000', type: 'Full-time', posted: '5 days ago', description: 'Create inclusive user experiences for diverse abilities and needs.', requirements: ['Design experience'], accessibility: ['Hearing impairments welcome'] }
  ],
  products: [
    { id: 1, name: 'Smart Navigation Cane', price: 299, image: '/placeholder.svg', description: 'AI-powered cane with obstacle detection and GPS', accessibility: ['Blind', 'Low Vision'] },
    { id: 2, name: 'Ergonomic Wheelchair', price: 1299, image: '/placeholder.svg', description: 'Lightweight, customizable wheelchair', accessibility: ['Mobility'] }
  ],
  appointments: [
    { time: '09:00', service: 'Mobility Assessment', available: true },
    { time: '11:00', service: 'Vision Therapy', available: true },
    { time: '14:00', service: 'Speech Therapy', available: false }
  ]
};

// --- API ---
export const api = {
  async getChatRooms() {
    await delay(200);
    try {
      return await safeFetch('/api/chat/rooms');
    } catch {
      return mock.chatRooms;
    }
  },
  async getMessages(roomId: number) {
    await delay(200);
    try {
      return await safeFetch(`/api/chat/rooms/${roomId}/messages`);
    } catch {
      return mock.messages[roomId] || [];
    }
  },
  async sendMessage(roomId: number, payload: { user: string; message: string }) {
    await delay(150);
    try {
      return await safeFetch(`/api/chat/rooms/${roomId}/messages`, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
    } catch {
      const newMsg = { id: Date.now(), user: payload.user, avatar: '/placeholder.svg', message: payload.message, time: 'now', type: 'text' };
      // @ts-ignore
      mock.messages[roomId] = mock.messages[roomId] || [];
      // @ts-ignore
      mock.messages[roomId].push(newMsg);
      return newMsg;
    }
  },
  async getPosts() {
    await delay(200);
    try { return await safeFetch('/api/discussions'); } catch { return mock.posts; }
  },
  async createPost(payload: any) {
    await delay(150);
    try { return await safeFetch('/api/discussions', { method: 'POST', body: JSON.stringify(payload) }); } catch {
      const post = { id: Date.now(), ...payload, time: 'just now', replies: 0, likes: 0 };
      mock.posts.unshift(post);
      return post;
    }
  },
  async likePost(postId: number) {
    await delay(120);
    try { return await safeFetch(`/api/discussions/${postId}/like`, { method: 'POST' }); } catch {
      const p: any = mock.posts.find((p: any) => p.id === postId);
      if (p) p.likes = (p.likes || 0) + 1;
      return { success: true };
    }
  },
  async getJobs() {
    await delay(200);
    try { return await safeFetch('/api/jobs'); } catch { return mock.jobs; }
  },
  async searchJobs(query: string) {
    await delay(200);
    try { return await safeFetch(`/api/jobs?search=${encodeURIComponent(query)}`); } catch {
      if (!query) return mock.jobs;
      return mock.jobs.filter((j: any) => (j.title + j.company + j.description).toLowerCase().includes(query.toLowerCase()));
    }
  },
  async applyJob(jobId: number, payload: any) {
    await delay(200);
    try { return await safeFetch(`/api/jobs/${jobId}/apply`, { method: 'POST', body: JSON.stringify(payload) }); } catch {
      return { success: true, applicationId: Date.now() };
    }
  },
  async getProducts() { await delay(150); try { return await safeFetch('/api/products'); } catch { return mock.products; } },
  async addToCart(productId: number) { await delay(120); try { return await safeFetch(`/api/cart`, { method: 'POST', body: JSON.stringify({ productId }) }); } catch { const p: any = mock.products.find((p: any) => p.id === productId); return p; } },
  async getAppointments() { await delay(150); try { return await safeFetch('/api/appointments'); } catch { return mock.appointments; } },
  async bookAppointment(time: string) { await delay(150); try { return await safeFetch(`/api/appointments/book`, { method: 'POST', body: JSON.stringify({ time }) }); } catch {
      const apt: any = mock.appointments.find((a: any) => a.time === time);
      if (apt) apt.available = false;
      return { success: true };
    } }
};

export default api;
