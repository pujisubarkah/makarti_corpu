import { Home, BookOpen, GraduationCap, Users, Settings, LogOut, BarChart2 } from 'lucide-vue-next'

export function useSidebarMenu(role: 'admin' | 'instruktur') {
  if (role === 'admin') {
    return {
      title: 'Admin Panel',
      subtitle: 'Control Center',
      icon: Settings,
      menu: [
        { label: 'Dashboard', path: '/admin', icon: Home },
        { label: 'Courses', path: '/admin/courses', icon: BookOpen },
        { label: 'Pemateri', path: '/admin/instructor', icon: GraduationCap },
        { label: 'Pembelajar', path: '/admin/students', icon: Users },
        { label: 'Settings', path: '/admin/settings', icon: Settings },
      ],
      logout: { label: 'Logout', icon: LogOut },
    }
  }
  return {
    title: 'Instruktur',
    subtitle: 'Panel Kendali',
    icon: GraduationCap,
    menu: [
      { label: 'Dashboard', path: '/instructor', icon: Home },
      { label: 'Kompetensi ', path: '/instructor/kompetensi', icon: GraduationCap },
      { label: 'Progress Pembelajar', path: '/instructor/progress', icon: BarChart2 },
    ],
    logout: { label: 'Logout', icon: LogOut },
  }
}
