const menuList = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "home",
    roles: ["admin", "editor", "guest"],
  },
  {
    title: "Document",
    path: "/doc",
    icon: "file",
    roles: ["admin", "editor", "guest"],
  },
  {
    title: "Guide",
    path: "/guide",
    icon: "key",
    roles: ["admin", "editor"],
  },
  {
    title: "Permission",
    path: "/permission",
    icon: "lock",
    children: [
      {
        title: "Explanation",
        path: "/permission/explanation",
        roles: ["admin"],
      },
      {
        title: "Admin",
        path: "/permission/adminPage",
        roles: ["admin"],
      },
      {
        title: "Guest",
        path: "/permission/guestPage",
        roles: ["guest"],
      },
      {
        title: "Editor",
        path: "/permission/editorPage",
        roles: ["editor"],
      },
    ],
  },
  {
    title: "Components",
    path: "/components",
    icon: "appstore",
    roles: ["admin", "editor"],
    children: [
      {
        title: "RichTextEditor",
        path: "/components/richTextEditor",
        roles: ["admin", "editor"],
      },
      {
        title: "Markdown",
        path: "/components/Markdown",
        roles: ["admin", "editor"],
      },
      {
        title: "Draggable",
        path: "/components/draggable",
        roles: ["admin", "editor"],
      },
    ],
  },
  {
    title: "Charts",
    path: "/charts",
    icon: "area-chart",
    roles: ["admin", "editor"],
    children: [
      {
        title: "Keyboard",
        path: "/charts/keyboard",
        roles: ["admin", "editor"],
      },
      {
        title: "Line",
        path: "/charts/line",
        roles: ["admin", "editor"],
      },
      {
        title: "Mix-chart",
        path: "/charts/mix-chart",
        roles: ["admin", "editor"],
      },
    ],
  },
  {
    title: "Nested",
    path: "/nested",
    icon: "cluster",
    roles: ["admin", "editor"],
    children: [
      {
        title: "Menu1",
        path: "/nested/menu1",
        children: [
          {
            title: "Menu1-1",
            path: "/nested/menu1/menu1-1",
            roles: ["admin", "editor"],
          },
          {
            title: "Menu1-2",
            path: "/nested/menu1/menu1-2",
            children: [
              {
                title: "Menu1-2-1",
                path: "/nested/menu1/menu1-2/menu1-2-1",
                roles: ["admin", "editor"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Table",
    path: "/table",
    icon: "table",
    roles: ["admin", "editor"],
  },
  {
    title: "Excel",
    path: "/excel",
    icon: "file-excel",
    roles: ["admin", "editor"],
    children: [
      {
        title: "Excel",
        path: "/excel/export",
        roles: ["admin", "editor"],
      },
      {
        title: "Upload",
        path: "/excel/upload",
        roles: ["admin", "editor"],
      },
    ],
  },
  {
    title: "Zip",
    path: "/zip",
    icon: "file-zip",
    roles: ["admin", "editor"],
  },
  {
    title: "Clipboard",
    path: "/clipboard",
    icon: "copy",
    roles: ["admin", "editor"],
  },
  {
    title: "User Management",
    path: "/user",
    icon: "usergroup-add",
    roles: ["admin"],
  },
  {
    title: "About",
    path: "/about",
    icon: "user",
    roles: ["admin", "editor", "guest"],
  },
  {
    title: "Bug",
    path: "/bug",
    icon: "bug",
    roles: ["admin"],
  },
]
export default menuList
