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
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'SIT232 - Object-Oriented Development',
        items: [
          { text: '', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/RB35/SIT-Notes' }
    ]
  },
  base: '/SIT-Notes/'
});