'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    artist_name: '',
    spotify_link: '',
    track_submission_url: '',
    remix_file_url: '',
    signal_tags: '',
    contact_email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        // Redirect to login if no user is found
        router.push('/login')
      } else {
        setUser(user)
        setIsLoadingUser(false)
      }
    }

    fetchUser()
  }, [router])

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.artist_name.trim()) {
      errors.artist_name = 'Artist name is required'
    }
    
    if (!formData.spotify_link.trim()) {
      errors.spotify_link = 'Spotify link is required'
    } else if (!formData.spotify_link.startsWith('https://open.spotify.com/artist/')) {
      errors.spotify_link = 'Please enter a valid Spotify artist URL (starts with https://open.spotify.com/artist/).'
    }
    
    if (formData.track_submission_url.trim()) {
      try {
        const url = new URL(formData.track_submission_url)
        if (!['soundcloud.com', 'youtu.be', 'youtube.com'].some(domain => url.hostname.endsWith(domain))) {
          errors.track_submission_url = 'Please enter a valid URL from SoundCloud or YouTube.'
        }
      } catch (e) {
        errors.track_submission_url = 'Please enter a valid URL.'
      }
    }

    const tags = formData.signal_tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    if (tags.length > 7) {
      errors.signal_tags = 'You can add a maximum of 7 tags.'
    }
    
    if (!formData.contact_email.trim()) {
      errors.contact_email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
      errors.contact_email = 'Please enter a valid email address'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm() || !user) return // Prevent submission if form is invalid or user is not logged in

    setIsSubmitting(true)
    setMessage('')

    const processedTags = formData.signal_tags
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0)

    try {
      const { error } = await supabase
        .from('artist_submissions')
        .insert([
          {
            artist_name: formData.artist_name.trim(),
            spotify_link: formData.spotify_link.trim(),
            track_submission_url: formData.track_submission_url.trim() || null,
            remix_file_url: formData.remix_file_url.trim() || null,
            signal_tags: processedTags,
            contact_email: formData.contact_email.trim().toLowerCase(),
            user_id: user.id,
          },
        ])

      if (error) throw error

      setMessage('Submission successful! We will review your track soon.')
      setFormData({
        artist_name: '',
        spotify_link: '',
        track_submission_url: '',
        remix_file_url: '',
        signal_tags: '',
        contact_email: '',
      })
    } catch (error) {
      setMessage('Error submitting form. Please try again.')
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (_e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = _e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Simple test data generator
  const generateTestData = () => {
    const uniqueId = Date.now(); // Use timestamp for some uniqueness
    const artistName = `Test Artist ${uniqueId} (test)`;
    const contactEmail = `test.artist${uniqueId}@example.com`;

    return {
      artist_name: artistName,
      spotify_link: `https://open.spotify.com/artist/testartist${uniqueId}`,
      track_submission_url: `https://soundcloud.com/testuser/test-track-${uniqueId}`,
      remix_file_url: `https://drive.google.com/test-remix-${uniqueId}`,
      signal_tags: `test, generated, tag${Math.floor(Math.random() * 100)}`,
      contact_email: contactEmail,
    };
  };

  const handleFillTestData = () => {
    const testData = generateTestData();
    setFormData(testData);
    setValidationErrors({}); // Clear validation errors when filling with test data
  };

  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-900 dark:text-gray-100">Loading user...</p>
      </div>
    ) // Or a spinner
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 bg-black/30 backdrop-blur-sm p-6 rounded-xl">
          <h1 className="text-4xl font-bold text-white mb-2">Submit Your Track</h1>
          <p className="text-lg text-gray-200">Share your music with the SignalUnion community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-lg dark:shadow-2xl">

          {process.env.NODE_ENV === 'development' && (
            <button
              type="button"
              onClick={handleFillTestData}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800 dark:focus:ring-offset-gray-800 mb-4"
            >
              Fill with Test Data
            </button>
          )}

          <div>
            <label htmlFor="artist_name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Artist Name *
            </label>
            <input
              type="text"
              name="artist_name"
              id="artist_name"
              required
              value={formData.artist_name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm\
                ${validationErrors.artist_name ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'}\
                bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500\
              `}
              placeholder="e.g., Cool Calm Pete"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your artist name or alias.</p>
            {validationErrors.artist_name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.artist_name}</p>
            )}
          </div>

          <div>
            <label htmlFor="spotify_link" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Spotify Artist Link *
            </label>
            <input
              type="url"
              name="spotify_link"
              id="spotify_link"
              required
              value={formData.spotify_link}
              onChange={handleChange}
              placeholder="https://open.spotify.com/artist/..."
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm\
                ${validationErrors.spotify_link ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'}\
                bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500\
              `}
            />
             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Link to your Spotify artist page.</p>
            {validationErrors.spotify_link && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.spotify_link}</p>
            )}
          </div>

          <div>
            <label htmlFor="track_submission_url" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Track Submission URL
            </label>
            <input
              type="url"
              name="track_submission_url"
              id="track_submission_url"
              value={formData.track_submission_url}
              onChange={handleChange}
              placeholder="https://soundcloud.com/user/track-title"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">A direct link to your track on platforms like SoundCloud or YouTube.</p>
          </div>

          <div>
            <label htmlFor="remix_file_url" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Remix File URL
            </label>
            <input
              type="url"
              name="remix_file_url"
              id="remix_file_url"
              value={formData.remix_file_url}
              onChange={handleChange}
              placeholder="https://drive.google.com/... or https://dropbox.com/..."
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
             <p className="mt-1 text-sm text-orange-600 dark:text-orange-400">Please ensure the file is viewable by anyone with the link.</p>
          </div>

          <div>
            <label htmlFor="signal_tags" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Signal Tags
            </label>
            <input
              type="text"
              name="signal_tags"
              id="signal_tags"
              value={formData.signal_tags}
              onChange={handleChange}
              placeholder="ambient, resistance, griefwave, posthuman"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Separate tags with commas. Max 7 tags.</p>
             {validationErrors.signal_tags && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.signal_tags}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Contact Email *
            </label>
            <input
              type="email"
              name="contact_email"
              id="contact_email"
              required
              value={formData.contact_email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm\
                ${validationErrors.contact_email ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'}\
                bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500\
              `}
              placeholder="your@email.com"
            />
             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">We&apos;ll use this to contact you about your submission.</p>
            {validationErrors.contact_email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.contact_email}</p>
            )}
          </div>

          {message && (
            <div className={`p-4 rounded-md text-sm\
              ${message.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700' : 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700'}\
            `}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isLoadingUser || !user} // Disable button while loading user or if no user
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Track'
            )}
          </button>

          {!user && !isLoadingUser && (
             <p className="text-center text-sm text-red-600 dark:text-red-400">You must be logged in to submit a track.</p>
          )}
        </form>
      </div>
    </div>
  )
} 