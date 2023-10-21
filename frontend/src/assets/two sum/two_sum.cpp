
#include <bits/stdc++.h>
using namespace std;
vector<int> twoSum(vector<int> &nums, int target)
{
    for (int i = 0; i < nums.size(); i++)
    {
        for (int j = i + 1; j < nums.size(); j++)
        {
            if (nums[i] + nums[j] == target)
            {
                vector<int> v;
                v.push_back(i);
                v.push_back(j);
                return v;
            }
        }
    }
    vector<int> v;
    return v;
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
        for (int i = 0; i < ans.size() - 1; i++)
        {
            cout << ans[i] << " ";
        }
        cout << ans[ans.size() - 1];
        cout << '\n';
    }
}
