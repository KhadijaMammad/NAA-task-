import { useState, FormEvent } from 'react';
import { X, Upload, Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Heading1, Heading2, Heading3 } from 'lucide-react';
import { PostFormData, Language } from '../types';

type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PostFormData) => void;
  initialData?: Partial<PostFormData>;
};

export default function PostModal({ isOpen, onClose, onSubmit, initialData }: PostModalProps) {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState<Language>('az');
  const [formData, setFormData] = useState<PostFormData>({
    title_az: initialData?.title_az || '',
    title_en: initialData?.title_en || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'news',
    cover_image: initialData?.cover_image || null,
    content_az: initialData?.content_az || '',
    content_en: initialData?.content_en || '',
    status: initialData?.status || 'active',
    publish_status: initialData?.publish_status || 'published',
    author: initialData?.author || 'snovruzlu',
  });
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    typeof initialData?.cover_image === 'string' ? initialData.cover_image : null
  );

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, cover_image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const currentTitle = language === 'az' ? formData.title_az : formData.title_en;
  const currentContent = language === 'az' ? formData.content_az : formData.content_en;

  const updateTitle = (value: string) => {
    if (language === 'az') {
      setFormData({ ...formData, title_az: value });
    } else {
      setFormData({ ...formData, title_en: value });
    }
  };

  const updateContent = (value: string) => {
    if (language === 'az') {
      setFormData({ ...formData, content_az: value });
    } else {
      setFormData({ ...formData, content_en: value });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Create News / Announcement</h2>
            <span className="text-gray-500">{step}/2</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setLanguage('az')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    language === 'az'
                      ? 'bg-red-100 text-red-700 border-2 border-red-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  AZ
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    language === 'en'
                      ? 'bg-red-100 text-red-700 border-2 border-red-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  EN
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={currentTitle}
                  onChange={(e) => updateTitle(e.target.value)}
                  placeholder="Enter title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="naa.edu.az/"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'news' })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-colors ${
                      formData.category === 'news'
                        ? 'bg-blue-50 text-blue-700 border-blue-600'
                        : 'bg-white text-gray-600 border-gray-300'
                    }`}
                  >
                    News
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'announcement' })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-colors ${
                      formData.category === 'announcement'
                        ? 'bg-blue-50 text-blue-700 border-blue-600'
                        : 'bg-white text-gray-600 border-gray-300'
                    }`}
                  >
                    Announcement
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {coverImagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={coverImagePreview}
                        alt="Cover preview"
                        className="w-24 h-24 object-cover rounded-lg mx-auto"
                      />
                      <p className="text-xs text-green-600 flex items-center justify-center gap-1">
                        <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                        Photo name
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-600">Upload Cover Image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Choose file
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HTML Content
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Use the toolbar to format your text with bold, italic, headers, lists, and more.
                </p>
                <div className="border border-gray-300 rounded-lg">
                  <div className="border-b border-gray-300 p-2 flex gap-1 flex-wrap bg-gray-50">
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <Italic className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <Underline className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <Heading1 className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <Heading2 className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <Heading3 className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <List className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <AlignLeft className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <AlignCenter className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <AlignRight className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <LinkIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={currentContent}
                    onChange={(e) => updateContent(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-b-lg"
                    placeholder="Enter your content here..."
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-[#2c3e82] text-white py-3 rounded-lg font-medium hover:bg-[#1e2a5e] transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setLanguage('az')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    language === 'az'
                      ? 'bg-red-100 text-red-700 border-2 border-red-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  AZ
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    language === 'en'
                      ? 'bg-red-100 text-red-700 border-2 border-red-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  EN
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="font-medium text-gray-900">Preview</h3>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Title:</p>
                  <p className="font-medium">{currentTitle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Category:</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      formData.category === 'news'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {formData.category === 'news' ? 'News' : 'Announcement'}
                  </span>
                </div>
                {coverImagePreview && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Cover Image:</p>
                    <img
                      src={coverImagePreview}
                      alt="Cover"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Content Preview:</p>
                  <div className="text-sm text-gray-700 line-clamp-3">{currentContent}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#2c3e82] text-white py-3 rounded-lg font-medium hover:bg-[#1e2a5e] transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
