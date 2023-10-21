#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int> &nums, int target)
{
    // write Your Code here
}

int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        int n;
        cin >> n;
        vector<int> v(n);
        for (int i = 0; i < n; i++)
        {
            cin >> v[i];
        }
        int target;
        cin >> target;
        vector<int> ans = twoSum(v, target);
        for (int i = 0; i < ans.size(); i++)
        {
            cout << ans[i];
        }
        cout << '\n';
    }
}