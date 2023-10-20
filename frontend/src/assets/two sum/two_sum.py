def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []


def main():
    n = int(input())
    arr = list(
        map(int, input().split())
    )  # Split the input string into a list of integers

    target = int(input())
    result = twoSum(arr, target)

    for i in result:
        print(i, end=" ")


if __name__ == "__main__":
    main()
