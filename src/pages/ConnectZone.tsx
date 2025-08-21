import { useState, useEffect } from 'react';
import { MessageCircle, Users, Image, Send, Mic, Camera, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MotionButton } from '@/components/ui/animated';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { toast } from '@/hooks/use-toast';

const ConnectZone = () => {
  const { speak } = useVoiceCommands();
  const [newMessage, setNewMessage] = useState('');
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [{ default: api } = {} as any] = [await import('@/lib/api') as any];
      try {
        const rooms = await api.getChatRooms();
        const postsRes = await api.getPosts();
        if (!mounted) return;
        setChatRooms(rooms);
        setPosts(postsRes);
      } catch (e) {
        // fallback handled in api
      }
    })();
    return () => { mounted = false; };
  }, []);

  const joinRoom = (room: any) => {
    setSelectedRoom(room);
    (async () => {
      const { default: api } = await import('@/lib/api');
      const msgs = await api.getMessages(room.id);
      setMessages(msgs);
    })();
    toast({ title: '✅ Joined Room', description: `You joined ${room.name}` });
    speak(`Joined ${room.name} chat room`);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    (async () => {
      try {
        const { default: api } = await import('@/lib/api');
        await api.sendMessage(selectedRoom?.id || 1, { user: 'You', message: newMessage });
        const msgs = await api.getMessages(selectedRoom?.id || 1);
        setMessages(msgs);
      } catch (e) {
        // ignore
      }
    })();
    toast({ title: '💬 Message Sent', description: 'Your message has been posted' });
    speak('Message sent');
    setNewMessage('');
  };

  const createPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    (async () => {
      const { default: api } = await import('@/lib/api');
      const created = await api.createPost({ title: newPost.title, content: newPost.content, author: 'You', avatar: '/placeholder.svg' });
      setPosts(prev => [created, ...prev]);
    })();
    toast({ title: '📝 Post Created', description: `Your post "${newPost.title}" has been published` });
    speak('Post published successfully');
    setNewPost({ title: '', content: '' });
  };

  const likePost = (post: any) => {
    (async () => {
      const { default: api } = await import('@/lib/api');
      await api.likePost(post.id);
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, likes: (p.likes || 0) + 1 } : p));
    })();
    toast({ title: '❤️ Post Liked', description: `You liked "${post.title}"` });
    speak(`Liked post: ${post.title}`);
  };

  const startVoiceMessage = () => {
    toast({
      title: "🎤 Voice Message",
      description: "Recording voice message...",
    });
    speak("Recording voice message. Start speaking now.");
  };

  const uploadImage = () => {
    toast({
      title: "📷 Image Upload",
      description: "Image uploaded with auto-generated alt text",
    });
    speak("Image uploaded with accessibility description");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          ConnectZone
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with the community through accessible chat rooms and discussion boards
        </p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>Chat Rooms</span>
          </TabsTrigger>
          <TabsTrigger value="discussions" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Discussions</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center space-x-2">
            <Image className="h-4 w-4" />
            <span>Media Sharing</span>
          </TabsTrigger>
        </TabsList>

        {/* Chat Rooms */}
        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Room List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Available Rooms</h2>
              {chatRooms.map((room) => (
                <Card 
                  key={room.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow ${selectedRoom?.id === room.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => joinRoom(room)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Join ${room.name} chat room with ${room.members} members`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{room.name}</h3>
                      {room.unread > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {room.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{room.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{room.members} members</span>
                      <span>{room.lastMessage}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-2">
              {selectedRoom ? (
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedRoom.name}</span>
                      <Badge variant="outline">{selectedRoom.members} members</Badge>
                    </CardTitle>
                  </CardHeader>
                  
                  {/* Messages */}
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={msg.avatar} alt={msg.user} />
                          <AvatarFallback>{msg.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">{msg.user}</span>
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                          </div>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        aria-label="Message input"
                      />
                      <MotionButton 
                        variant="outline" 
                        size="sm"
                        onClick={startVoiceMessage as any}
                        aria-label="Record voice message"
                      >
                        <Mic className="h-4 w-4" />
                      </MotionButton>
                      <MotionButton 
                        variant="outline" 
                        size="sm"
                        onClick={uploadImage as any}
                        aria-label="Upload image"
                      >
                        <Camera className="h-4 w-4" />
                      </MotionButton>
                      <MotionButton onClick={sendMessage as any} size="sm">
                        <Send className="h-4 w-4" />
                      </MotionButton>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                      <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Select a chat room to start chatting</p>
                    </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Discussion Boards */}
        <TabsContent value="discussions" className="space-y-6">
          {/* Create New Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Create New Discussion</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={newPost.title}
                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Discussion title..."
                aria-label="Discussion title"
              />
              <Textarea
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Share your thoughts, ask questions, or start a conversation..."
                className="min-h-32"
                aria-label="Discussion content"
              />
              <div className="flex justify-end">
                <Button onClick={createPost}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Discussion Posts */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Discussions</h2>
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={post.avatar} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>by {post.author}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground">{post.content}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => likePost(post)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          ❤️ {post.likes} likes
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          💬 {post.replies} replies
                        </Button>
                        <Button variant="ghost" size="sm">
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Media Sharing */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Image className="h-5 w-5" />
                <span>Share Images & Media</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Upload Images</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop images here, or click to browse. 
                  Alt text will be automatically generated for accessibility.
                </p>
                <Button onClick={uploadImage}>
                  <Camera className="h-4 w-4 mr-2" />
                  Choose Images
                </Button>
              </div>

              {/* Recent Uploads */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Community Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <img 
                        src="/placeholder.svg" 
                        alt={`Community shared image ${i} - showing accessibility equipment`}
                        className="w-full h-32 object-cover"
                      />
                      <CardContent className="p-3">
                        <p className="text-xs text-muted-foreground">
                          Shared by User {i}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Auto Alt-Text: Accessibility equipment demonstration
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectZone;