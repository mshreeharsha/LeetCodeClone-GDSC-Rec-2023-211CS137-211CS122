#include <stdio.h>
#include <stdlib.h>

int *twoSum(int *nums, int numsSize, int target)
{
    for (int i = 0; i < numsSize; i++)
    {
        for (int j = i + 1; j < numsSize; j++)
        {
            if (nums[i] + nums[j] == target)
            {
                int *result = (int *)malloc(2 * sizeof(int));
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    return NULL;
}

int main()
{
    int t;
    scanf("%d", &t);
    while (t--)
    {
        int n;
        scanf("%d", &n);
        int *arr = (int *)malloc(n * sizeof(int));

        for (int i = 0; i < n; i++)
        {
            scanf("%d", &arr[i]);
        }

        int target;
        scanf("%d", &target);

        int *result = twoSum(arr, n, target);

        if (result != NULL)
        {
            printf("%d ", result[0]);
            printf("%d", result[1]);
            printf("\n");
            free(result);
        }
        else
        {
            printf("No two elements add up to the target.\n");
        }

        free(arr);
    }

    return 0;
}
