import { defineConfig } from 'vitepress'

import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'

import { withMermaid } from "vitepress-plugin-mermaid";

import sit232Bar from "../sit232/sidebar"

//---------------------------------------
//  Sidebar config (Other config below)
//---------------------------------------
const sidebarNav = {
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

  //SIT232 sidebar
  '/sit232/': sit232Bar
};

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
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
    sidebar: sidebarNav,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/RB35/SIT-Notes' }
    ],

    editLink: {
      pattern: 'https://github.com/RB35/SIT-Notes/edit/main/:path'
    }
  },
  base: '/SIT-Notes/'
}));