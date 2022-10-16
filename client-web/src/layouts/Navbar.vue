<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import RIcon from '../components/basic/RIcon.vue';


const {t} = useI18n()

const navList = [
    {
        icon: 'person-circle',
        route: '/activity',
        label: t('home.nav.activity')
    },
    {
        icon: 'person-circle',
        route: '/chat',
        label: t('home.nav.chat')
    },
    {
        icon: 'person-circle',
        route: '/meet',
        label: t('home.nav.meet')
    },
    {
        icon: 'person-circle',
        route: '/calender',
        label: t('home.nav.calender')
    },
]

const current = ref(navList[0])

const to = function(item: any) {

    current.value = item
}
</script>

<template>
    
    <nav w-70px class="navbar">
        
        <div class="navbar__item" v-for="(item, key) in navList" :key="key"
            relative
            w70px h70px
            flex flex-col items-center justify-center
            cursor-pointer
            :active="current.route === item.route"
            @click="to(item)">
          <RIcon type="person-circle" />
          <span> {{ item.label }} </span>
        </div>

      </nav>
</template>

<style>


.navbar__item[active=true] {
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