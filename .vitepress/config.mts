import { defineConfig } from 'vitepress'

import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [
      GitChangelog({
        // Fill in your repository URL here
        repoURL: () => 'https://github.com/RB35/SIT-Notes',
      }),
      GitChangelogMarkdownSection(),
    ],
  },
  title: "SIT Notes",
  description: "Range of notes from Deakin SIT units.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Units', link: '/welcome' }
    ],
    sidebar: {
      // This sidebar gets displayed when a user
      // is on `guide` directory.
      '/welcome': [
        {
          text: 'Units',
          items: [
            { text: 'SIT232 - Object Oriented Development', link: '/sit232/' },
          ]
        }
      ],

      '/sit232/': [
        {
          text: 'Design/Concepts',
          items: [
            { text: 'Index', link: '/config/' },
            { text: 'Three', link: '/config/three' },
            { text: 'Four', link: '/config/four' }
          ]
        },
        {
          text: 'C#',
          items: [
            { text: 'Index', link: '/config/' },
            { text: 'Three', link: '/config/three' },
            { text: 'Four', link: '/config/four' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/RB35/SIT-Notes' }
    ],

    editLink: {
      pattern: 'https://github.com/RB35/SIT-Notes/edit/main/:path'
    }
  },
  base: '/SIT-Notes/'
});