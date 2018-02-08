# WTWInterviewProject

To run, clone repository and open index.html in browser of choice. 

Attempt at writing client-side .csv parser for claims triangles in Javascript. 

I did my best to not use any external libraries and try to construct an implementation from the language tools itself. This came at the cost of code legibility & clarity as I was unsure of how to derive the solution via best practices. 

Originally I had imagined to traverse the input file in one iteration and complete the parsing within O(n) time but this turned out to be too difficult as I struggled with figuring out the best data structure for this problem. In the end, I opted to create a hash map which resembles the claims triangle in shape. 

Overall I am happy with being able to complete the task although I am dissatisfied with how I handled certain functions i.e using too many iterations and not being able to cleanly map out the cumulative incremental value.
