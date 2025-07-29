"""
You are given two strings word1 and word2.
Merge the strings by adding letters in alternating order,
starting with word1. If a string is longer than the other, 
append the additional letters onto the end of the merged string.
Return the merged string.
Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
"""

def merge_alternately(word1: str, word2: str) -> str:
    result = ''
    length = max(len(word1), len(word2))
    
    for i in range(length):
        if i < len(word1):
            result += word1[i]
        if i < len(word2):
            result += word2[i]
    
    return result


# Test the function
if __name__ == "__main__":
    print(merge_alternately("abc", "pqr")) 