import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar';


import Git from 'simple-git'

const git = Git({
  maxConcurrentProcesses: 200
})

// taken from vueuse
async function getContributorsAt(path: string) {
  try {
    const list = (
      await git.raw(['log', '--pretty=format:"%an|%ae"', '--', path])
    )
      .split('\n')
      .map((i) => i.slice(1, -1).split('|') as [string, string])
    const map: Record<string, { name: string; count: number }> = {}

    list
      .filter((i) => i[1])
      .forEach((i) => {
        if (!map[i[1]]) {
          map[i[1]] = {
            name: i[0],
            count: 0
          }
        }
        map[i[1]].count++
      })

    return Object.values(map)
      .sort((a, b) => b.count - a.count)
      .map((i) => i.name)
  } catch (e) {
    console.error(e)
    return []
  }
}


// https://vitepress.dev/reference/site-config
const vitePressOptions = {
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
};

const vitePressSidebarOptions = {
  // VitePress Sidebar's options here...
  documentRootPath: '/',
  collapsed: false,
  capitalizeFirst: true
};

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));