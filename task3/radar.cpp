#include <iostream>
#include <cmath>

using namespace std;

const double EPSILON = 1e-9; // prag admisibil de eroare

class IntelRadar
{
public:
    int possiblePoints(int x1, int y1, int r1, int x2, int y2, int r2)
    {
        double dist = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2)); // distanta dintre centrele cercurilor
        double sum = r1 + r2;                                  // suma razelor
        double diff = abs(r1 - r2);                            // diferenta razelor
        if (dist < EPSILON && diff < EPSILON)
            return -1;
        if (dist > sum + EPSILON || dist < diff - EPSILON)
            return 0;
        if (abs(dist - sum) < EPSILON || abs(dist - diff) < EPSILON)
            return 1;
        if (dist > diff + EPSILON && dist < sum - EPSILON)
            return 2;
        return 0;
    }
};

int main()
{
    IntelRadar radar;
    // Check al exemplelor propuse:
    cout << "0) -- cercurile se intersecteaza in 2 puncte: ";
    cout << radar.possiblePoints(0, 0, 13, 40, 0, 37) << endl;
    cout << "1) -- cercuri tangente intr-un punct: ";
    cout << radar.possiblePoints(0, 0, 3, 0, 7, 4) << endl;
    cout << "2) -- sunt prea departe unul de altul: ";
    cout << radar.possiblePoints(0, 0, 5, 10, 10, 3) << endl;
    cout << "3) -- cercuri identice/ unul in altul ==> o infinitate de posibilitati: ";
    cout << radar.possiblePoints(0, 0, 1, 0, 0, 1) << endl;
    return 0;
}