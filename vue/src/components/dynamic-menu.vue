<template>
    <div class="menu-container">
        <template v-for="v in menuList">
            <el-submenu :index="v.name" v-if="v.children&&v.children.length>0&&v.meta.isMenu=='True'&&v.meta.isPage=='False'" :key="v.name">
                <template slot="title">
                    <span>{{v.meta.name}}</span>
                </template>
                <el-menu-item-group>
                    <my-nav :menuList="v.children"></my-nav>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item :key="v.name" :index="v.name" @click="gotoRoute(v.name)" v-else-if="v.meta.isMenu=='True'&&v.meta.isPage=='True'">
                <span slot="title">{{v.meta.name}}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
export default {
    name: 'my-nav',
    props: {
        menuList: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    methods: {
        gotoRoute(name) {
            this.$router.push({ name }).catch(err => {console.log(err)})
        }
    }
}
</script>

<style lang="scss" scoped>
.menu-container {}
</style>
