import React, { useState } from "react";
import { Search, BookOpen, Clock, Check, Home, Library, User, Bell, Calendar, X, RotateCcw, History } from "lucide-react";
import Navigation from "./nav";


const BookCatalog = ({user}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Passion",
      author: "Frank Herbert",
      description: "Set in the distant future amidst a feudal interstellar society, Dune tells the story of young Paul Atreides, whose family accepts stewardship of the planet Arrakis.",
      coverUrl: "https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=600",
      available: true,
      category: "Science Fiction",
      dueDate: null, 
     chapter1: "", 
     chapter2: ""
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      description: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the #1 New York Times bestselling author of The Martian.",
      coverUrl: "https://images.pexels.com/photos/2090104/pexels-photo-2090104.jpeg?auto=compress&cs=tinysrgb&w=600",
      available: true,
      category: "Science Fiction",
      dueDate: "2024-02-01"
    },
    {
      id: 3,
      title: "Take The Risk",
      author: "Matt Haig",
      description: "Between life and death there is a library. When Nora finds herself in the Midnight Library, she has a chance to make things right.",
      coverUrl: "https://images.pexels.com/photos/2386687/pexels-photo-2386687.jpeg?auto=compress&cs=tinysrgb&w=600",
      available: true,
      category: "Contemporary Fiction",
      dueDate: null
    }
  ]);

  const handleOpenBorrowModal = (book) => {
    setSelectedBook(book);
    setShowBorrowModal(true);
  };

  const handleBorrow = () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 14 days loan period
    const dueDateStr = dueDate.toISOString().split('T')[0];

    // Update books array with new status
    const updatedBooks = books.map(book =>
      book.id === selectedBook.id
        ? { ...book, available: false, dueDate: dueDateStr }
        : book
    );

    setBooks(updatedBooks);
    const borrowedBook = { ...selectedBook, dueDate: dueDateStr, borrowDate: new Date().toISOString().split('T')[0] };
    setBorrowedBooks([...borrowedBooks, borrowedBook]);

    // Add to history
    setBorrowHistory([...borrowHistory, {
      ...borrowedBook,
      status: 'borrowed',
      actionDate: new Date().toISOString().split('T')[0]
    }]);

    setNotificationMessage(`Successfully borrowed "${selectedBook.title}". Due date: ${dueDateStr}`);
    setShowNotification(true);
    setShowBorrowModal(false);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleReturn = (book) => {
    // Update books array
    const updatedBooks = books.map(b =>
      b.id === book.id
        ? { ...b, available: true, dueDate: null }
        : b
    );
    setBooks(updatedBooks);

    // Remove from borrowed books
    const updatedBorrowedBooks = borrowedBooks.filter(b => b.id !== book.id);
    setBorrowedBooks(updatedBorrowedBooks);

    // Add return to history
    setBorrowHistory([...borrowHistory, {
      ...book,
      status: 'returned',
      actionDate: new Date().toISOString().split('T')[0]
    }]);

    setNotificationMessage(`Successfully returned "${book.title}"`);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const HistoryModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-3xl max-w-4xl w-full mx-4 overflow-hidden shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Borrowing History</h2>
            <button
              onClick={() => setShowHistoryModal(false)}
              className="text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[60vh]">
            {borrowHistory.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No borrowing history yet.</p>
            ) : (
              <div className="space-y-4">
                {borrowHistory.map((record, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/50 rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={record.coverUrl}
                        alt={record.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-medium">{record.title}</h3>
                        <p className="text-sm text-slate-400">by {record.author}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {record.status === 'borrowed' ? 'Borrowed on' : 'Returned on'}: {record.actionDate}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${record.status === 'borrowed'
                        ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"}`}>
                      {record.status === 'borrowed' ? 'Borrowed' : 'Returned'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Navigation
        borrowedBooks={borrowedBooks}
        user={user}
        onHistoryClick={() => setShowHistoryModal(true)}
      />

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 bg-sky-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slide-in">
          {notificationMessage}
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && <HistoryModal />}

      {/* Borrow Modal */}
      {showBorrowModal && selectedBook && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-3xl max-w-2xl w-full mx-4 overflow-hidden shadow-xl transform transition-all">
            <div className="relative">
              <button
                onClick={() => setShowBorrowModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white z-10"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                  <img
                    src={selectedBook.coverUrl}
                    alt={selectedBook.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 w-full md:w-1/2">
                  <h2 className="text-2xl font-bold mb-2">{selectedBook.title}</h2>
                  <p className="text-slate-400 mb-4">by {selectedBook.author}</p>

                  <div className="mb-4">
                    <span className="text-sky-500 flex items-center gap-2 mb-2">
                      <BookOpen size={16} />
                      {selectedBook.category}
                    </span>
                    <span className="text-emerald-500 flex items-center gap-2">
                      <Calendar size={16} />
                      Due in 14 days
                    </span>
                  </div>

                  <p className="text-slate-300 mb-6">{selectedBook.description}</p>

                  <div className="flex gap-4">
                    <button
                      onClick={handleBorrow}
                      className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <Clock size={18} />
                      Confirm Borrow
                    </button>
                    <button
                      onClick={() => setShowBorrowModal(false)}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 py-2 px-4 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search books by title or author..."
            className="w-full pl-12 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl
                     focus:outline-none focus:ring-2 focus:ring-sky-500/50 text-white
                     placeholder-slate-400 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Currently Borrowed Books Section */}
        {borrowedBooks.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Currently Borrowed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {borrowedBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-3xl overflow-hidden
                           border border-slate-700/50 hover:border-sky-500/50
                           transition-all duration-500"
                >
                  <div className="relative h-48">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent opacity-80" />
                  </div>
                  <div className="p-6 relative -mt-16">
                    <span className="absolute top-0 right-6 px-3 py-1 rounded-full text-xs font-medium
                                   bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      Due: {book.dueDate}
                    </span>
                    <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                    <p className="text-sm text-slate-400 mb-4">by {book.author}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <BookOpen size={14} />
                        {book.category}
                      </span>
                      <button
                        onClick={() => handleReturn(book)}
                        className="px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium
                                 bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                      >
                        <RotateCcw size={14} />
                        Return
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Books Grid */}
        <h2 className="text-2xl font-bold mb-6">Available Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="group relative bg-slate-800/50 backdrop-blur-sm rounded-3xl overflow-hidden
                       border border-slate-700/50 hover:border-sky-500/50
                       transition-all duration-500 hover:shadow-xl hover:shadow-sky-500/10"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent opacity-80" />
              </div>

              {/* Content */}
              <div className="p-6 relative -mt-20">
                {/* Status Badge */}
                <span
                  className={`absolute top-0 right-6 px-3 py-1 rounded-full text-xs font-medium
                           ${book.available
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-rose-500/20 text-rose-300 border border-rose-500/30"}`}
                >
                  {book.available ? "Available" : `Due: ${book.dueDate}`}
                </span>

                {/* Title & Author */}
                <h3 className="text-xl font-semibold mb-1 text-white">{book.title}</h3>
                <p className="text-sm text-slate-400 mb-4">by {book.author}</p>

                {/* Description */}
                <p className="text-sm text-slate-300 mb-6 line-clamp-2">
                  {book.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <BookOpen size={14} />
                    {book.category}
                  </span>

                  <button
                    onClick={() => book.available && handleOpenBorrowModal(book)}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium
                             transition-all duration-300 ${book.available
                        ? "bg-sky-500 hover:bg-sky-600 text-white"
                        : "bg-slate-700/50 text-slate-400 cursor-not-allowed"
                      }`}
                    disabled={!book.available}
                  >
                    {book.available ? (
                      <>
                        <Clock size={14} />
                        Borrow
                      </>
                    ) : (
                      <>
                        <Check size={14} />
                        Borrowed
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCatalog;