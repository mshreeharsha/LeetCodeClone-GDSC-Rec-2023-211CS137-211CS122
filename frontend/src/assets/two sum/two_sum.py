def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []


if __name__ == "__main__":
    t = int(input())
    for _ in range(t):
        n = int(input())
        v = list(map(int, input().split()))
        target = int(input())
        ans = twoSum(v, target)
        print(*ans)
