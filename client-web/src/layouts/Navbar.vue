<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import RIcon from '../components/basic/RIcon.vue';
import NavbarItem from './NavbarItem.vue';


const {t} = useI18n()
const route = useRoute()
const router = useRouter()

const navList = [
    {
        icon: 'bell',
        route: '/activity',
        fillbg: true,
        label: t('home.nav.activity')
    },
    {
        icon: 'chat',
        activeIcon: 'chat-active',
        route: '/chat',
        label: t('home.nav.chat'),
    },
    {
        icon: 'meet',
        activeIcon: 'meet-active',
        route: '/meet',
        label: t('home.nav.meet')
    },
    {
        icon: 'calendar',
        route: '/calender',
        label: t('home.nav.calender')
    },
]


const current = ref(navList.find(item => item.route === route.path))

const to = function(item: any) {

    current.value = item
    router.push(item.route)
}
</script>

<template>
    
    <nav w-70px class="navbar">
        
        <NavbarItem v-for="(item, key) in navList" :key="key" 
            :active="current.route === item.route"
            :fill-background="item.fillbg"
            :label="item.label"
            :icon="item.icon"
            :active-icon="item.activeIcon"
            @click="to(item)" />

    </nav>
</template>

<style>


.navbar__item[active=true] span {
    color: var(--color-primary);
}

.navbar__item[active=true]::before {
    
    content: "";
    position: absolute;
    left: 0;
    top: calc(50% - 9px);
    width: 6px;
    height: 18px;
    background: var(--color-primary);
    color: var(--color-primary);
    border-radius: 0 4px 4px 0;
}

@media screen and (max-width: 768px) {
    nav.navbar {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    
    .navbar__item[active=true]::before {
        width: 18px;
        height: 6px;
        top: initial;
        bottom: 0;
        left: calc(50% - 9px);
        border-radius: 4px 4px 0 0;
    }
}
</style>