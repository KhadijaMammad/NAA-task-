import { useState } from 'react';
import { Edit2, Trash2, ChevronDown, Search, Plus } from 'lucide-react';
import { Post, FilterOptions } from '../types';

type PostsTableProps = {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
  onAddNew: () => void;
};

export default function PostsTable({ posts, onEdit, onDelete, onAddNew }: PostsTableProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    status: 'all',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const itemsPerPage = 10;

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = filters.category === 'all' || post.category === filters.category;
    const matchesStatus = filters.status === 'all' || post.status === filters.status;
    const matchesSearch =
      filters.search === '' ||
      post.title_az.toLowerCase().includes(filters.search.toLowerCase()) ||
      post.title_en.toLowerCase().includes(filters.search.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleCategorySelect = (category: 'all' | 'news' | 'announcement') => {
    setFilters({ ...filters, category });
    setShowCategoryDropdown(false);
  };

  const handleStatusSelect = (status: 'all' | 'active' | 'inactive') => {
    setFilters({ ...filters, status });
    setShowStatusDropdown(false);
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">News & Announcements</h1>
                <p className="text-sm text-gray-500 mt-1">{posts.length} Posts</p>
              </div>
              <button
                onClick={onAddNew}
                className="flex items-center gap-2 bg-[#2c3e82] text-white px-4 py-2.5 rounded-lg hover:bg-[#1e2a5e] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add News or Announcement
              </button>
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative">
                <button 
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 min-w-[140px]"
                >
                  <span className="text-sm text-gray-700">
                    {filters.category === 'all' ? 'All Posts' : filters.category === 'news' ? 'News' : 'Announcements'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleCategorySelect('all')}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        filters.category === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      All Posts
                    </button>
                    <button
                      onClick={() => handleCategorySelect('news')}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        filters.category === 'news' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      News
                    </button>
                    <button
                      onClick={() => handleCategorySelect('announcement')}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        filters.category === 'announcement' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      Announcements
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <button 
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 min-w-[140px]"
                >
                  <span className="text-sm text-gray-700">
                    {filters.status === 'all' ? 'All Status' : filters.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {showStatusDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleStatusSelect('all')}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        filters.status === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      All Status
                    </button>
                    <button
                      onClick={() => handleStatusSelect('active')}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        filters.status === 'active' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => handleStatusSelect('inactive')}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        filters.status === 'inactive' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      Inactive
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sharing time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Publish Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {post.cover_image && (
                          <img
                            src={post.cover_image}
                            alt={post.title_az}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className="max-w-xs">
                          <p className="font-medium text-gray-900 truncate">{post.title_az}</p>
                          <p className="text-xs text-gray-500 truncate mt-1">
                            {post.title_en}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          post.category === 'news'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {post.category === 'news' ? 'News' : 'Announcement'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-900">{formatDate(post.sharing_time)}</p>
                        <p className="text-gray-500">{formatTime(post.sharing_time)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium ${
                          post.status === 'active' ? 'text-green-700' : 'text-gray-500'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            post.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        />
                        {post.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium ${
                          post.publish_status === 'published' ? 'text-green-700' : 'text-gray-500'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            post.publish_status === 'published' ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        />
                        {post.publish_status === 'published' ? 'Publish' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{post.author}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEdit(post)}
                          className="p-1.5 text-orange-600 hover:bg-orange-50 rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(post)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-sm rounded ${
                    currentPage === page
                      ? 'bg-[#2c3e82] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="text-sm text-gray-600">
              {itemsPerPage} / Page
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}