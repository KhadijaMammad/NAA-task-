import { useState, useEffect } from 'react';
import { createPost, deletePost, updatePost, usePosts } from '../hooks/usePosts';
import { Post, PostFormData } from '../types';
import { mockPosts } from '../utils/mockData';
import Sidebar from '../components/Sidebar';
import PostsTable from '../components/PostsTable';
import PostModal from '../components/PostModal';
import SuccessModal from '../components/SuccessModal';
import DeleteModal from '../components/DeleteModal';
// import Sidebar from './components/Sidebar';
// import PostsTable from './components/PostsTable';
// import PostModal from './components/PostModal';
// import SuccessModal from './components/SuccessModal';
// import DeleteModal from './components/DeleteModal';
// import { usePosts, createPost, updatePost, deletePost } from './hooks/usePosts';
// import { Post, PostFormData } from './types';
// import { mockPosts } from './utils/mockData';

function Main() {
  const { posts, loading, refetch } = usePosts();
  const [displayPosts, setDisplayPosts] = useState<Post[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  useEffect(() => {
    if (posts.length === 0 && !loading) {
      setDisplayPosts(mockPosts);
    } else {
      setDisplayPosts(posts);
    }
  }, [posts, loading]);

  const handleAddNew = () => {
    setSelectedPost(null);
    setIsPostModalOpen(true);
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

  const handleDelete = (post: Post) => {
    setPostToDelete(post);
    setIsDeleteModalOpen(true);
  };

  const handleSubmitPost = async (formData: PostFormData) => {
    try {
      let coverImageUrl = formData.cover_image;

      if (formData.cover_image instanceof File) {
        coverImageUrl = URL.createObjectURL(formData.cover_image);
      }

      const postData = {
        title_az: formData.title_az,
        title_en: formData.title_en,
        slug: formData.slug,
        category: formData.category,
        cover_image: typeof coverImageUrl === 'string' ? coverImageUrl : null,
        content_az: formData.content_az,
        content_en: formData.content_en,
        status: formData.status,
        publish_status: formData.publish_status,
        author: formData.author,
        sharing_time: new Date().toISOString(),
      };

      if (selectedPost) {
        await updatePost(selectedPost.id, postData);
      } else {
        await createPost(postData);
      }

      setIsPostModalOpen(false);
      setIsSuccessModalOpen(true);
      refetch();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    }
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;

    try {
      await deletePost(postToDelete.id);
      setIsDeleteModalOpen(false);
      setPostToDelete(null);
      refetch();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <PostsTable
        posts={displayPosts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />

      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmit={handleSubmitPost}
        initialData={selectedPost || undefined}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={selectedPost ? 'Your news updated successfully' : 'Your news added successfully'}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        postTitle={postToDelete?.title_az}
      />
    </div>
  );
}

export default Main;
