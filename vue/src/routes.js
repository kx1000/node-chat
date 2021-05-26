import Login from "@/components/pages/auth/Login";
import Chat from "@/components/pages/chat/Chat";

export const routes = [
    {
        path: '/',
        component: Login,
        name: 'login'
    },
    {
        path: '/chat',
        component: Chat,
        name: 'chat'
    },
]