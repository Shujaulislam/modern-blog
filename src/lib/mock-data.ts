export const MOCK_POSTS = [
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Exploring the Future of ${['AI', 'Web Development', 'Cloud Computing', 'Mobile Apps', 'Cybersecurity'][i % 5]} - Part ${i + 1}`,
    excerpt: "Dive deep into the latest trends and innovations shaping the future of technology. Discover how these advancements are transforming industries and creating new opportunities.",
    category: ['Technology', 'Development', 'Design', 'Tutorial', 'News'][i % 5],
    author: ['John Doe', 'Jane Smith', 'Alex Johnson', 'Sarah Wilson', 'Mike Brown'][i % 5],
    date: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toLocaleDateString(),
    readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
    content: `
      <p>Welcome to an in-depth exploration of the latest developments in technology. In this article, we'll dive deep into the transformative power of innovation and its impact on various industries.</p>
      
      <h2>The Current Landscape</h2>
      <p>The technological landscape is rapidly evolving, bringing forth new challenges and opportunities. Organizations across the globe are adapting to these changes, implementing cutting-edge solutions to stay competitive in an increasingly digital world.</p>
      
      <h2>Key Trends</h2>
      <p>Several key trends are shaping the future of technology:</p>
      <ul>
        <li>Artificial Intelligence and Machine Learning</li>
        <li>Cloud Computing and Edge Computing</li>
        <li>Internet of Things (IoT)</li>
        <li>Cybersecurity and Privacy</li>
      </ul>
      
      <h2>Impact on Industries</h2>
      <p>These technological advancements are having a profound impact on various industries, from healthcare to finance, manufacturing to retail. Organizations are leveraging these technologies to improve efficiency, enhance customer experience, and drive innovation.</p>
      
      <h2>Looking Ahead</h2>
      <p>As we look to the future, it's clear that technology will continue to play a crucial role in shaping our world. Organizations that embrace these changes and adapt accordingly will be better positioned for success in the digital age.</p>
      
      <h2>Conclusion</h2>
      <p>The journey of technological evolution continues, and it's exciting to see what the future holds. Stay tuned for more insights and updates on the latest developments in technology.</p>
    `
  }))
];
