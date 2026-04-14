import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function App() {
  const [posts, setPosts] = useState([
    { id: 1, user: "小明", text: "今天好開心 😆" },
    { id: 2, user: "小美", text: "在學寫程式 💻" }
  ]);

  const [newPost, setNewPost] = useState("");

  const [messages, setMessages] = useState([
    { id: 1, user: "小明", text: "哈囉！" },
    { id: 2, user: "你", text: "嗨～" },
    { id: 3, user: "小明", text: "你好呀！" }
  ]);

  const [chatInput, setChatInput] = useState("");

  const addPost = () => {
    if (!newPost) return;
    setPosts([
      { id: Date.now(), user: "你", text: newPost },
      ...posts
    ]);
    setNewPost("");
  };

  const sendMessage = () => {
    if (!chatInput) return;
    setMessages([
      ...messages,
      { id: Date.now(), user: "你", text: chatInput }
    ]);
    setChatInput("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🌍 我的社交媒體</h1>

      <Tabs defaultValue="feed">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="feed">動態</TabsTrigger>
          <TabsTrigger value="chat">聊天</TabsTrigger>
        </TabsList>

        {/* 動態 */}
        <TabsContent value="feed">
          <Card className="mt-4">
            <CardContent className="p-4 space-y-2">
              <Input
                placeholder="你在想什麼？"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <Button onClick={addPost} className="w-full">發佈</Button>
            </CardContent>
          </Card>

          <div className="mt-4 space-y-3">
            {posts.map((p) => (
              <Card key={p.id}>
                <CardContent className="p-3">
                  <b>{p.user}</b>
                  <p>{p.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 聊天 */}
        <TabsContent value="chat">
          <div className="h-80 overflow-y-auto border rounded p-2 space-y-2 flex flex-col">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.user === "你" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${
                    m.user === "你"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <b>{m.user}</b>: {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-2">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="輸入訊息..."
            />
            <Button onClick={sendMessage}>送出</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
