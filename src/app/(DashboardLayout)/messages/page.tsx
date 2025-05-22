"use client";

import { useState, useEffect } from "react";
import {
  Trash2,
  Search,
  Mail,
  MailOpen,
  Star,
  Clock,
  X,
  CheckCircle2,
} from "lucide-react";
import Spinner from "@/components/ui/spinner";

// Message type definition
type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  important: boolean;
};

export default function MessagesPage() {
  // Sample messages data
  const initialMessages: Message[] = [
    {
      id: "msg-1",
      name: "John Smith",
      email: "john.smith@example.com",
      subject: "Website Design Project Inquiry",
      message:
        "Hello, I'm interested in hiring you for a website redesign project for my company. We are looking for a modern, responsive design that can showcase our products effectively. Could you please share your availability and rates? Looking forward to hearing from you soon.",
      date: "2025-05-20T14:30:00",
      read: false,
      important: true,
    },
    {
      id: "msg-2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      subject: "Collaboration Opportunity",
      message:
        "Hi there, I'm a content creator and I'm looking to collaborate with a skilled web developer for an upcoming project. I've seen your portfolio and I'm impressed with your work. Would you be interested in discussing a potential partnership? Let me know if you'd like to schedule a call to discuss details.",
      date: "2025-05-19T09:15:00",
      read: true,
      important: false,
    },
    {
      id: "msg-3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      subject: "Job Opportunity at TechCorp",
      message:
        "Dear Developer, I'm a recruiter at TechCorp and we're currently looking for a talented React developer to join our team. Based on your portfolio, I believe you might be a great fit for this position. The role offers competitive compensation and the opportunity to work on cutting-edge projects. Please let me know if you're interested, and I can share more details about the position.",
      date: "2025-05-18T16:45:00",
      read: true,
      important: true,
    },
    {
      id: "msg-4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      subject: "Question about your services",
      message:
        "Hello, I'm reaching out because I need a simple portfolio website for my photography business. I was wondering if you could provide a quote for this kind of project. I would need about 5-7 pages including a gallery, about me, and contact sections. What would be your timeline for completing something like this? Thanks in advance for your help!",
      date: "2025-05-17T11:20:00",
      read: false,
      important: false,
    },
    {
      id: "msg-5",
      name: "David Wilson",
      email: "david.wilson@example.com",
      subject: "Feedback on your recent work",
      message:
        "Hi, I just wanted to reach out and say that I really admire the portfolio website you created recently. The design is clean, modern, and very user-friendly. I particularly liked the animations and how smoothly everything transitions. As a fellow developer, I appreciate the attention to detail. Keep up the great work!",
      date: "2025-05-16T08:50:00",
      read: true,
      important: false,
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "important">("all");
  const [successMessage, setSuccessMessage] = useState("");

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and search messages
  const filteredMessages = messages.filter((message) => {
    // Apply filter
    if (filter === "unread" && message.read) return false;
    if (filter === "important" && !message.important) return false;

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query) ||
        message.subject.toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Handle message selection
  const handleSelectMessage = (message: Message) => {
    // Mark as read when selected
    if (!message.read) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      );
    }

    setSelectedMessage(message);
  };

  // Handle marking message as read/unread
  const handleToggleRead = (id: string, read: boolean) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read } : msg))
    );

    // Update selected message if it's the one being toggled
    if (selectedMessage?.id === id) {
      setSelectedMessage((prev) => (prev ? { ...prev, read } : null));
    }

    setSuccessMessage(`Message marked as ${read ? "read" : "unread"}`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Handle marking message as important/not important
  const handleToggleImportant = (id: string, important: boolean) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, important } : msg))
    );

    // Update selected message if it's the one being toggled
    if (selectedMessage?.id === id) {
      setSelectedMessage((prev) => (prev ? { ...prev, important } : null));
    }

    setSuccessMessage(
      `Message marked as ${important ? "important" : "not important"}`
    );
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Handle deleting a message
  const handleDeleteMessage = (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) {
      return;
    }

    setMessages((prev) => prev.filter((msg) => msg.id !== id));

    // Clear selected message if it's the one being deleted
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }

    setSuccessMessage("Message deleted successfully");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  // Get unread count
  const unreadCount = messages.filter((msg) => !msg.read).length;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold">Messages</h1>
          <p className="text-gray-400">
            Manage contact form submissions and inquiries
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <div className="bg-[#a855f7] text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {unreadCount} unread
            </div>
          )}
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-400 rounded-lg flex justify-between items-center">
          <p>{successMessage}</p>
          <button
            onClick={() => setSuccessMessage("")}
            className="text-green-400 hover:text-green-300"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <Spinner size="xl" text="Loading messages..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg overflow-hidden">
              {/* Search and Filter */}
              <div className="p-4 border-b border-[#2d1b4d]">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1 text-xs rounded-full ${
                      filter === "all"
                        ? "bg-[#a855f7] text-white"
                        : "bg-[#1a1025] text-gray-400 hover:bg-[#2d1b4d]"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("unread")}
                    className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
                      filter === "unread"
                        ? "bg-[#a855f7] text-white"
                        : "bg-[#1a1025] text-gray-400 hover:bg-[#2d1b4d]"
                    }`}
                  >
                    <MailOpen className="h-3 w-3" />
                    Unread
                  </button>
                  <button
                    onClick={() => setFilter("important")}
                    className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
                      filter === "important"
                        ? "bg-[#a855f7] text-white"
                        : "bg-[#1a1025] text-gray-400 hover:bg-[#2d1b4d]"
                    }`}
                  >
                    <Star className="h-3 w-3" />
                    Important
                  </button>
                </div>
              </div>

              {/* Messages List */}
              <div className="max-h-[600px] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="p-6 text-center">
                    <Mail className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No messages found</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {searchQuery
                        ? "Try a different search term"
                        : filter !== "all"
                        ? `No ${filter} messages`
                        : "Your inbox is empty"}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#2d1b4d]">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => handleSelectMessage(message)}
                        className={`p-4 cursor-pointer transition-colors ${
                          selectedMessage?.id === message.id
                            ? "bg-[#2d1b4d]"
                            : message.read
                            ? "hover:bg-[#1a1025]"
                            : "bg-[#1a1025]/50 hover:bg-[#1a1025]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              message.read ? "bg-gray-600" : "bg-[#a855f7]"
                            }`}
                          ></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3
                                className={`${
                                  message.read
                                    ? "text-gray-300"
                                    : "text-white font-medium"
                                } truncate`}
                              >
                                {message.name}
                              </h3>
                              <div className="flex items-center">
                                {message.important && (
                                  <Star className="h-3 w-3 text-yellow-500 mr-1 flex-shrink-0" />
                                )}
                                <span className="text-gray-500 text-xs">
                                  {new Date(message.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm truncate">
                              {message.subject}
                            </p>
                            <p className="text-gray-500 text-xs truncate mt-1">
                              {message.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg overflow-hidden h-full">
                {/* Message Header */}
                <div className="p-6 border-b border-[#2d1b4d]">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-white text-xl font-bold">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleToggleImportant(
                            selectedMessage.id,
                            !selectedMessage.important
                          )
                        }
                        className={`p-1.5 rounded-full ${
                          selectedMessage.important
                            ? "text-yellow-500 bg-yellow-500/10"
                            : "text-gray-400 hover:text-yellow-500 hover:bg-[#1a1025]"
                        }`}
                        title={
                          selectedMessage.important
                            ? "Remove importance"
                            : "Mark as important"
                        }
                      >
                        <Star className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleToggleRead(
                            selectedMessage.id,
                            !selectedMessage.read
                          )
                        }
                        className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#1a1025]"
                        title={
                          selectedMessage.read
                            ? "Mark as unread"
                            : "Mark as read"
                        }
                      >
                        {selectedMessage.read ? (
                          <Mail className="h-4 w-4" />
                        ) : (
                          <MailOpen className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                        className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-[#1a1025]"
                        title="Delete message"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#a855f7]/20 flex items-center justify-center text-[#a855f7]">
                          {selectedMessage.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {selectedMessage.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {selectedMessage.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(selectedMessage.date)}
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="p-6">
                  <div className="text-gray-300 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Message Actions */}
                <div className="p-6 border-t border-[#2d1b4d] flex justify-between">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-4 py-2 bg-[#1a1025] hover:bg-[#2d1b4d] text-white rounded-lg transition-colors text-sm"
                  >
                    Back to Messages
                  </button>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-[#1a1025] hover:bg-[#2d1b4d] text-white rounded-lg transition-colors text-sm flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      Mark Resolved
                    </button>
                    <button className="px-4 py-2 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-lg transition-colors text-sm flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg overflow-hidden h-full flex flex-col items-center justify-center py-16">
                <Mail className="h-16 w-16 text-gray-600 mb-4" />
                <h3 className="text-white text-lg font-medium mb-2">
                  No message selected
                </h3>
                <p className="text-gray-400 text-center max-w-md px-6">
                  Select a message from the list to view its contents
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
