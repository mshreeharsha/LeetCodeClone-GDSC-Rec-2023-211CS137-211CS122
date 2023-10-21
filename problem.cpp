

// vector<int> twoSum(vector<int> &nums, int target)
// {
//     // write Your Code here
// }

// #include <bits/stdc++.h>
// using namespace std;
// int main()
// {
//     int t;
//     cin >> t;
//     while (t--)
//     {
//         int n;
//         cin >> n;
//         vector<int> v(n);
//         for (int i = 0; i < n; i++)
//         {
//             cin >> v[i];
//         }
//         int target;
//         cin >> target;
//         vector<int> ans = twoSum(v, target);
//         for (int i = 0; i < ans.size()-1; i++)
//         {
//             cout << ans[i]<<" ";
//         }
//         cout<<ans[ans.size()-1]<<'\n';
//     }
// }

int * twoSum(int *arr,int target){
    //write your code here
}

#include <stdio.h>
#include <stdlib.h>
int main(){
    int t;
    scanf("%d",&t);
    while(t--){
        int n;
        scanf("%d",&n);
        int * arr = (int *)malloc(sizeof(int)*n);
        for(int i=0;i<n;i++){
            scanf("%d",arr[i]);
        }
        int target;
        scanf("%d",&target);
        int * result = twoSum(arr,target);
        printf("%d %d",result[0],result[1]);
    }
}