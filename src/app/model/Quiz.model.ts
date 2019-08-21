import { Properties } from "./properties.model";

export const Quiz: Properties[] = [
 {categoryName: 'Music',
 
    questions: [
        {
    question: ' 1 Which of these documents is issued to drivers after learning??', 
    
    options:[
            {option: 'A.Drivers license', correct: true},
            {option: 'B.Car receipt', correct: false},
            {option: 'C.Residence permit',correct: false},
            {option: 'D.Learners permit',correct: false}
        ]   
    },
    {
        question: ' 2. Which of these is a barrier to driver training?', 
        options:[
                {option: 'A.Age', correct: true},
                {option: 'B.Height', correct: false},
                {option: 'C.Blood Group', correct: false},
                {option: 'D.Genoty', correct: false}
            ]   
        },
        {
            question: '3.What does red in traffic light means?', 
            options:[
                    {option: 'A.Danger', correct: true},
                    {option: 'B.Warning', correct: false},
                    {option: 'C.Go', correct: false},
                    {option: 'D.Vehicle at fault', correct: false}
                ]   
            },
            {
                question: ' 4 Which of these parts of a car prevents accident?', 
                options:[
                        {option: 'A.Windscreen', correct: false},
                        {option: 'B.Seat belts', correct: true},
                        {option: 'C.Booths', correct: false},
                        {option: 'D.Bonnets',correct: false}
                    ]   
                },
                {
    question: ' 5.What are underage drivers called?', 
     options:[
       {option: 'A.Little ',correct: false},
       {option: 'B.Minors ',correct: true},
       {option: 'C. Majors ',correct: false},
       {option: 'D.Peak',correct: false}
          ]   
  },
  
]
},




];

