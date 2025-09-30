'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Search,
  Users,
  Online,
  Offline,
  Clock,
  Check,
  CheckCheck
} from 'lucide-react'

interface Message {
  id: string
  senderId: string
  senderName: string
  senderRole: string
  content: string
  timestamp: Date
  read: boolean
  type: 'text' | 'file' | 'system'
}

interface Chat {
  id: string
  name: string
  participants: Array<{
    id: string
    name: string
    role: string
    avatar?: string
    online: boolean
  }>
  lastMessage?: Message
  unreadCount: number
  type: 'direct' | 'group'
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Dr. Michael Chen',
    type: 'direct',
    participants: [
      { id: '1', name: 'Dr. Michael Chen', role: 'faculty', online: true },
      { id: '2', name: 'Sarah Johnson', role: 'student', online: false }
    ],
    lastMessage: {
      id: '1',
      senderId: '1',
      senderName: 'Dr. Michael Chen',
      senderRole: 'faculty',
      content: 'Your application has been approved. Great work!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      type: 'text'
    },
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Placement Team',
    type: 'group',
    participants: [
      { id: '3', name: 'Lisa Rodriguez', role: 'placement', online: true },
      { id: '4', name: 'John Smith', role: 'recruiter', online: true },
      { id: '2', name: 'Sarah Johnson', role: 'student', online: false }
    ],
    lastMessage: {
      id: '2',
      senderId: '3',
      senderName: 'Lisa Rodriguez',
      senderRole: 'placement',
      content: 'New opportunities have been posted. Check them out!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
      type: 'text'
    },
    unreadCount: 0
  }
]

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Dr. Michael Chen',
    senderRole: 'faculty',
    content: 'Hi Sarah! I reviewed your application for the TechCorp internship.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
    type: 'text'
  },
  {
    id: '2',
    senderId: '2',
    senderName: 'Sarah Johnson',
    senderRole: 'student',
    content: 'Thank you for reviewing it, Dr. Chen. What are your thoughts?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
    read: true,
    type: 'text'
  },
  {
    id: '3',
    senderId: '1',
    senderName: 'Dr. Michael Chen',
    senderRole: 'faculty',
    content: 'Your application looks excellent! I\'ve approved it and sent it to the placement cell.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    type: 'text'
  }
]

export default function ChatSystem() {
  const [chats, setChats] = useState<Chat[]>(mockChats)
  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: '2', // Current user
      senderName: 'Sarah Johnson',
      senderRole: 'student',
      content: newMessage,
      timestamp: new Date(),
      read: false,
      type: 'text'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'text-blue-600'
      case 'faculty': return 'text-purple-600'
      case 'placement': return 'text-green-600'
      case 'recruiter': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]"
      >
        {/* Chat List */}
        <Card className="glass border-0 lg:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <span>Messages</span>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredChats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      activeChat?.id === chat.id ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500' : ''
                    }`}
                    onClick={() => setActiveChat(chat)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/avatars/${chat.name.toLowerCase().replace(' ', '')}.jpg`} />
                          <AvatarFallback>
                            {chat.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {chat.participants.some(p => p.online) && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {chat.name}
                          </h3>
                          {chat.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {chat.lastMessage?.content}
                        </p>
                        <p className="text-xs text-gray-400">
                          {chat.lastMessage?.timestamp && formatTime(chat.lastMessage.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="glass border-0 lg:col-span-3">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/avatars/${activeChat.name.toLowerCase().replace(' ', '')}.jpg`} />
                      <AvatarFallback>
                        {activeChat.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {activeChat.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {activeChat.participants.map((participant, index) => (
                          <div key={participant.id} className="flex items-center space-x-1">
                            <span className={`text-xs ${getRoleColor(participant.role)}`}>
                              {participant.role}
                            </span>
                            {index < activeChat.participants.length - 1 && (
                              <span className="text-gray-400">•</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-0 flex-1 overflow-y-auto">
                <div className="p-4 space-y-4 h-96 overflow-y-auto">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className={`flex ${message.senderId === '2' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${
                          message.senderId === '2' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        } rounded-lg p-3`}>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium">
                              {message.senderName}
                            </span>
                            <span className={`text-xs ${
                              message.senderId === '2' ? 'text-blue-100' : getRoleColor(message.senderRole)
                            }`}>
                              {message.senderRole}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.senderId === '2' && (
                              <div className="flex items-center space-x-1">
                                {message.read ? (
                                  <CheckCheck className="h-3 w-3 text-blue-200" />
                                ) : (
                                  <Check className="h-3 w-3 text-blue-200" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-500">
                  Choose a chat from the sidebar to start messaging
                </p>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  )
}
