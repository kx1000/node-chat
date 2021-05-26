import Login from "@/components/pages/auth/Login";
import Chat from "@/components/pages/chat/Chat";
import Register from "@/components/pages/auth/Register";

export const routes = [
    {
        path: '/',
        component: Login,
        name: 'login'
    },
    {
        path: '/register',
        component: Register,
        name: 'register'
    },
    {
        path: '/chat',
        component: Chat,
        name: 'chat'
    },
]