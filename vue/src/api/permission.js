// import axios from '@/config/httpConfig'
// export function fetchPermission() {
//     return axios.get('/permission.json')
// }

import axios from 'axios'
import serverUrl from '@/config/serverUrl'
import store from "@/store";

// 递归创建子树
function buildTree(list,treeNode) {
    let i=0;
    while(list[i]){
      if(list[i].parent_id == treeNode.id){
        treeNode.children.push(list[i]);
        list.splice(i, 1);
        buildTree(list, treeNode.children[treeNode.children.length-1]);
      }else{
        i++;
      }
    }
}


export function fetchPermission() {
    return new Promise(function(resolve){
        let allPermissions = [];
        let permissionsTree = [];
        axios.get(serverUrl+'/api/getAllPermissions')
        .then(function (response) {
            console.log('allPermissions');
            console.log(response.data.permissions.rows);
            allPermissions = response.data.permissions.rows;
            return axios.post(serverUrl+'/api/getUserPermissions', {
                'user_id': store.state.UserToken.user_id,
              })
        })
        .then(function (response) {
            console.log('permissionIds');
            console.log(response.data.permissions)
            let permissionIds = response.data.permissions;
            let permissions = [];
            let changed = true;
            while(changed == true){
                changed = false;
                for(let i=0;i<allPermissions.length;i++){
                    if(permissionIds.indexOf(allPermissions[i].id) != -1){
                        permissions.push(allPermissions[i]),
                        permissionIds.push(allPermissions[i].parent_id)
                        allPermissions.splice(i, 1);
                        changed = true;
                    }
                }
            }

            for(let i=0;i<permissions.length;i++){
                permissions[i].children = [];
                if(permissions[i].name == '系统'){
                    permissionsTree.push(permissions[i]);
                    permissions.splice(i, 1);
                }
            }
            for(let i=0;i<permissionsTree.length;i++){
                buildTree(permissions,permissionsTree[i])
            }
            console.log('permissionsTree')
            console.log(permissionsTree)
            resolve(permissionsTree);
        })
        .catch(function (error) {
            console.log(error);
        }); 
    });

    

}


