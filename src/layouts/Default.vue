<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="bg-cyan-8">
            <q-toolbar>
                <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="fas fa-bars"/>
                <q-toolbar-title>{{title}}</q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
            <q-list v-for='(item, index) in menu' :key='index'>
                <q-item exact :to='item.url'>
                    <q-item-section v-if='item.icon' avatar>
                        <q-icon :name='"fas " + item.icon'/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{item.title}}</q-item-label>
                    </q-item-section>
                    <q-item-section class="items-end" v-if="item.btn">
                        <q-btn size="12px" flat round color="primary" :icon='item.btn.icon'/>
                    </q-item-section>
                </q-item>
                <q-list class="q-submenu">
                    <q-separator/>
                    <q-item v-for='(submenu, _index) in item.submenu' :key='_index' :to='submenu.url'>
                        <q-item-section v-if='item.icon'>
                            {{submenu.title}}
                        </q-item-section>
                    </q-item>

                </q-list>
            </q-list>
        </q-drawer>

        <q-page-container>
            <div class="container scroll-component">
                <router-view/>
            </div>
        </q-page-container>
    </q-layout>

</template>
<script>

    // import {mapGetters} from 'vuex'

    export default {
        name: 'LayoutDefault',
        data() {
            return {
                title: this.$route.name,
                menu: [
                    {
                        title: 'Dashboard',
                        url: '/',
                        icon: 'fa-tachometer-alt',
                    }, {
                        title: 'Products',
                        url: '/products',
                        icon: 'fa-briefcase',
                        submenu: [
                            {
                                title: 'Local',
                                url: '/products/local'
                            }, {
                                title: 'Products 1',
                                url: '/products/site'
                            }, {
                                title: 'Products 2',
                                url: '/products/site'
                        }
                        ],
                    }],
                leftDrawerOpen: this.$q.platform.is.desktop
            }
        },
        methods: {

        },
        updated() {
            this.title = this.$route.name;
        },
        // computed: mapGetters(['parsVideo']),
    }
</script>

<style lang="scss">
    @import "../styles/style";

    .container {
        max-height: calc(100vh - 50px);
        height: 100vh;
        overflow-y: auto;
    }

    .q-submenu {
        a {
            min-height: 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            font-weight: bold;
            color: #555;
            border-bottom: 1px solid rgba(0, 0, 0, .1)
        }
    }
</style>