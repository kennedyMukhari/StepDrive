import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
import { ProfilePage } from '../profile/profile';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  questions: Array<QUESTIONS> = [
    {
    id: '148',
    question: 'To turn, number, is used:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/LightMotorVehicleScketch.jpg?alt=media&token=ee347973-5009-4d43-8bf5-7a859f709c1d',
    suggestions: [],
    options: [
      {option: '5', correct: false},
      {option: '4', correct: true},
      {option: '10', correct: false}
    ]
  },
  {
    id: '149',
    question: 'Number (x) is not found in an automatic vehicle',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/LightMotorVehicleScketch.jpg?alt=media&token=ee347973-5009-4d43-8bf5-7a859f709c1d',
    suggestions: [],
    options: [
      {option: '2', correct: false},
      {option: '6', correct: false},
      {option: '8', correct: true}
    ]
  },
  {
    id: '150',
    question: 'To ensure that your parked vehicle does not move, use number:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/LightMotorVehicleScketch.jpg?alt=media&token=ee347973-5009-4d43-8bf5-7a859f709c1d',
    suggestions: [],
    options: [
      {option: '9', correct: false},
      {option: '8', correct: false},
      {option: '7', correct: true}
    ]
  },
  {
    id: '151',
    question: 'To select a gear, you must use number?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/LightMotorVehicleScketch.jpg?alt=media&token=ee347973-5009-4d43-8bf5-7a859f709c1d',
    suggestions: [],
    options: [
      {option: '7 and 9', correct: false},
      {option: '5 and 8', correct: false},
      {option: '6 and 8', correct: true}
    ]
  },
  {
    id: '152',
    question: 'To accelerate your vehicle, you must use number:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/LightMotorVehicleScketch.jpg?alt=media&token=ee347973-5009-4d43-8bf5-7a859f709c1d',
    suggestions: [],
    options: [
      {option: '8', correct: false},
      {option: '5', correct: false},
      {option: '10', correct: true}
    ]
  },
  {
    id: '153',
    question: 'To stop your vehicle, you must use number:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/LightMotorVehicleScketch.jpg?alt=media&token=ee347973-5009-4d43-8bf5-7a859f709c1d',
    suggestions: [],
    options: [
      {option: '7', correct: false},
      {option: '8', correct: false},
      {option: '9', correct: true}
    ]
  },
  {
    id: '154',
    question: 'The distance it takes the driver of a motor vehicle to stop is:',
    image: '',
    suggestions: [
          'Longer on a wet road than on a dry road',
          'Longer if the vehicle is travelling at a higher speed',
          'Longer if the vehicle is loaded'
    ],
    options: [
      {option: '(1) is only correct', correct: false},
      {option: 'All of the above are correct', correct: true},
      {option: 'None of the above are correct', correct: false}
    ]
  },
  {
    id: '156',
    question: 'What controls must you use when you are going to turn sharp?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/LightMotorVehicleScketch.jpg?alt=media&token=ee347973-5009-4d43-8bf5-7a859f709c1d',
    suggestions: [],
    options: [
      {option: '3,4,5,9, and 10 only', correct: false},
      {option: '1,3,5,6, and 8 only', correct: false},
      {option: '1,3,4,5,6,8,9 and 10 only', correct: true}
    ]
  },
  {
    id: '132',
    question: 'The maximum distance between two vehicles being towed is:',
    image: '',
    suggestions: [],
    options: [
      {option: '3.5m', correct: true},
      {option: '1.8m', correct: false},
      {option: '2.5m', correct: false}
    ]
  },
  {
    id: '133',
    question: 'Which is allowed when towing another vehicle ?',
    image: '',
    suggestions: [
          'A motor car tows another motorcar with a rope and drives 40km/h',
          'You tow another vehicle with a tow bar',
          'A tractor tows a trailer with 10 passengers on it at a speed of 30 km/h'
    ],
    options: [
      {option: 'All of the above', correct: false},
      {option: '(2) and (3) are only correct', correct: true},
      {option: '(2) is only correct', correct: false}
    ]
  },
  {
    id: '135',
    question: 'What is true with regard to seat belts?',
    image: '',
    suggestions: [
          'If your vehicle has seat belts in the rear , it must be worn',
          'You need not wear a seat belt when reversing',
          'Children younger than 14 years need not wear a seat belt',
          'If the front seat has a seat belt , your only passenger may not sit at the back where there is no seat belt'
    ],
    options: [
      {option: '(1) is only correct', correct: false},
      {option: '(1), (2) and (4) are correct', correct: true},
      {option: 'All of the above are correct', correct: false}
    ]
  },
  {
    id: '137',
    question: 'If you only have a learners license for a light motor vehicle:',
    image: '',
    suggestions: [
          'There must be someone with you in the vehicle with the same class driving license',
          'You are not allowed to drive on a freeway',
          'No passengers are allowed with you in the vehicle'
    ],
    options: [
      {option: 'Only (1) is correct', correct: true},
      {option: 'All of the above are correct', correct: false},
      {option: 'Only (1) and (2) are correct', correct: false}
    ]
  },
  {
    id: '139',
    question: 'This road sign shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/must-drive-there.gif?alt=media&token=7cec91fd-3192-40dc-9e75-8daf6acf58e6',
    suggestions: [],
    options: [
      {option: 'The area is motor car taxis only', correct: false},
      {option: 'You can drive there if you wish', correct: false},
      {option: 'You must drive there', correct: true}
    ]
  },
  {
    id: '140',
    question: 'This sign forbids:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/no-minibusses.gif?alt=media&token=fa1ce778-1ae5-4306-9623-5ff74f8b7aee',
    suggestions: [],
    options: [
      {option: 'All motor vehicles to drive past this sign', correct: false},
      {option: 'Minibuses to drive past this sign', correct: true},
      {option: 'Minibuses to pick up passengers', correct: false}
    ]
  },
  {
    id: '141',
    question: 'The lights of your vehicle parked on a public road between sunset and sunrise need not kept lite when the vehicle is parked:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/LightMotorVehicleScketch.jpg?alt=media&token=ee347973-5009-4d43-8bf5-7a859f709c1d',
    suggestions: [
          '10 km form a lighted street lamp',
          'Next to the roadway of the road',
          'In a demarcated parked area'
    ],
    options: [
      {option: 'Only (ii) and (iii) are correct', correct: false},
      {option: 'All of the above are correct', correct: true},
      {option: 'Only (i) and (iii) are correct', correct: false}
    ]
  },
  {
    id: '143',
    question: 'This sign indicates that you:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/parking-restiction.gif?alt=media&token=ab49baaa-1649-46ab-b369-0f293fe10268',
    suggestions: [],
    options: [
      {option: 'May not drive there between 06:00 and 09:00', correct: true},
      {option: 'Are only allowed to drive there between 06:00 and 09:00', correct: false},
      {option: 'May not park there for more than 3 hours', correct: false}
    ]
  },
  {
    id: '144',
    question: 'It is illegal when you drive and a passenger:',
    image: '',
    suggestions: [],
    options: [
      {option: "Sits directly behind you when you only have a learner's license", correct: false},
      {option: 'Rides on the bumper of your vehicle', correct: true},
      {option: "Fiddles with the radio's volume knob", correct: false}
    ]
  },
  {
    id: '145',
    question: 'This sign shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/reserved-for-cars.gif?alt=media&token=851fae05-f353-4df9-8f5f-eaaccaea9557',
    suggestions: [],
    options: [
      {option: 'You must use that part of the road', correct: false},
      {option: 'You can use that part of the road if you wish', correct: true},
      {option: 'There is parking for motor cars there', correct: false}
    ]
  },
  {
    id: '146',
    question: "The tread pattern of your vehicle's tyres may not be less than:",
    image: '',
    suggestions: [],
    options: [
      {option: '1mm', correct: true},
      {option: '0.75mm', correct: false},
      {option: '1.5mm', correct: false}
    ]
  },
  {
    id: '147',
    question: 'This road sign shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/no-motor-cars-r223-.jpg?alt=media&token=2459e760-5668-403b-b2e7-929ee40d87a0',
    suggestions: [],
    options: [
      {option: 'No motorcars may drive there', correct: true},
      {option: 'You may not park your motorcar there', correct: false},
      {option: 'No taxis may drive there', correct: true}
    ]
  },
  {
    id: '11',
    question: 'What does warning sign L10 show you?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Froads%20crossing.gif?alt=media&token=e49a6c1b-b103-48db-84b3-95c2508d90c0',
    suggestions: [],
    options: [
      {option: 'Roads crossing ahead and other vehicles from the side must stop or yield at the intersection', correct: true},
      {option: 'A railway line intersects with the road that you are travelling on', correct: false},
      {option: 'A railway line intersects with the road that you are travelling on', correct: false}
    ]
  },
  {
    id: '5',
    question: 'What does this blue sign show you?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fminimum-speed.gif?alt=media&token=2c35e36c-6c0c-4462-8c40-a0788c5a167d',
    suggestions: [],
    options: [
      {option: 'You may not drive slower than 50km/h', correct: true},
      {option: 'You may not drive faster than 50 km/h', correct: false},
      {option: 'That sign is applicable for 50 m', correct: false}
    ]
  },
  {
    id: '6',
    question: 'What does sign this red sign show you?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fnot-turn-left-ahead.gif?alt=media&token=f0dcd218-2210-4d43-8596-5d9628fe4e2d',
    suggestions: [
          'You may not turn left ahead',
          'You may not turn left there',
          'There is one-way to the right ahead'
    ],
    options: [
      {option: '(1) and (2) are correct', correct: false},
      {option: '(2) is correct', correct: false},
      {option: '(1) is only correct', correct: true}
    ]
  },
  {
    id: '12',
    question: 'This blue sign with the white arrow shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fonly-drive-straight.gif?alt=media&token=fe1495d2-7c38-4266-ac30-cc874a153a20',
    suggestions: [],
    options: [
      {option: 'You will find a one-way road ahead', correct: false},
      {option: 'You will find a free-way ahead', correct: false},
      {option: 'You must only drive straight on', correct: true}
    ]
  },
  {
    id: '13',
    question: 'This prohibition sign indicates what?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fno-hooter.gif?alt=media&token=4969b134-0ffe-4302-b1a3-4546d7738fa1',
    suggestions: [],
    options: [
      {option: 'There is a hospital ahead where you must not make a noise', correct: false},
      {option: 'You may not pick up people', correct: false},
      {option: 'Prohibits you from using your hooter', correct: true}
    ]
  },
  {
    id: '15',
    question: 'This triangle shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fcyclist.gif?alt=media&token=65e96a32-6529-407c-85ae-65f692006e98',
    suggestions: [],
    options: [
      {option: 'No cyclist are allowed there', correct: false},
      {option: 'There is a special lane for cyclists', correct: false},
      {option: 'You must be on the lookout for cyclist', correct: true}
    ]
  },
  {
    id: '19',
    question: 'This warning sign indicates:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/slippery.jpg?alt=media&token=970b2abf-90c7-4873-a896-cfd84a23792e',
    suggestions: [],
    options: [
      {option: 'Severe winds are common in this area', correct: false},
      {option: 'The road Is slippery', correct: true},
      {option: 'The road is untarred', correct: false}
    ]
  },
  {
    id: '20',
    question: 'What does sign stop sign tell you?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2F4-way-stop.gif?alt=media&token=d689551a-51b4-43fe-b318-8c33a67a6d9b',
    suggestions: [],
    options: [
      {option: 'It is the same as a yield sign and you can proceed without stopping2', correct: false},
      {option: 'Stop and drive when it is safe to do so in the sequence that vehicles stopped at the stop line', correct: true},
      {option: 'Makes sure that it is safe, wait until all traffic has departed and then drive on', correct: false}
    ]
  },
  {
    id: '21',
    question: 'This rectangular road sign shows you that the road:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Froad-winding-ahead.gif?alt=media&token=bf12e4e5-f0c8-45c6-b07e-ea86b5dcf267',
    suggestions: [],
    options: [
      {option: 'Winds for 12 km', correct: true},
      {option: 'Winds 12 km from there', correct: false},
      {option: 'Is slippery for 12 km', correct: false}
    ]
  },
  {
    id: '22',
    question: 'All roads signs with a yellow background as above is:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Ftemporary.gif?alt=media&token=9ff218dc-e4ff-4911-b5d1-365798cda7a1',
    suggestions: [],
    options: [
      {option: 'a temporary sign', correct: true},
      {option: 'a warning sign', correct: false},
      {option: 'a tourism sign', correct: false}
    ]
  },
  {
    id: '23',
    question: 'When the following sign flashes, what does it mean?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fdanger-ahead.gif?alt=media&token=31b6861b-5c4d-4edc-b01e-62569433ccb9',
    suggestions: [],
    options: [
      {option: 'There is danger in the road ahead', correct: true},
      {option: 'The police have blockade ahead', correct: false},
      {option: 'There is a robot ahead', correct: false}
    ]
  },
  {
    id: '26',
    question: 'This double sign shows you the:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fmaximum-speed-at-night.gif?alt=media&token=4075fd9d-906d-4608-b0d2-1c57679e0847',
    suggestions: [],
    options: [
      {option: 'Maximum speed allowed at night', correct: true},
      {option: 'Distance to the next town is 100km', correct: false},
      {option: 'Recommended speed when your lights are on', correct: false}
    ]
  },
  {
    id: '28',
    question: 'This road sign shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fno-overtake.gif?alt=media&token=8ee74b85-ff79-475c-8569-ffcc7e68f768',
    suggestions: [],
    options: [
      {option: 'there is a bridge ahead where only one vehicle can cross at a time', correct: false},
      {option: 'no motor vehicle may pass each other', correct: true},
      {option: 'only motor cars may not pass each other', correct: false}
    ]
  },
  {
    id: '35',
    question: 'This double striped sign shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fno-enter-without-permision.gif?alt=media&token=5b609d2d-a413-494b-9b46-7443a25e421b',
    suggestions: [],
    options: [
      {option: 'There is a road with two lanes ahead', correct: false},
      {option: 'You are not allowed to drive there without permission', correct: true},
      {option: 'A freeway starts', correct: false}
    ]
  },
  {
    id: '39',
    question: 'If you are involved in an accident you:',
    image: '',
    suggestions: [
          'must immediately stop your vehicle',
          'must see if someone is injured',
          'may use a little bit of alcohol for the shock'
    ],
    options: [
      {option: 'All the above are correct', correct: false},
      {option: '(1) and (2) are correct', correct: true},
      {option: '(2) is correct', correct: false}
    ]
  },
  {
    id: '41',
    question: 'This sign indicates that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fno-enter.gif?alt=media&token=c6a30ac2-5b3b-4e37-9c36-a7820fee42e2',
    suggestions: [],
    options: [
      {option: 'The roads ends', correct: false},
      {option: 'You are not allowed to enter there', correct: true},
      {option: 'Entrance is only allowed for ambulances', correct: false}
    ]
  },
  {
    id: '44',
    question: 'When this sign is illuminated, it shows you that',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fcoming-from.gif?alt=media&token=f86e08bc-0788-4edd-a7f0-246d4f36aa4c',
    suggestions: [],
    options: [
      {option: 'there is no throughway there', correct: false},
      {option: 'there is an unguarded railway crossing ahead', correct: false},
      {option: 'it is a lane only for traffic coming from the front', correct: true}
    ]
  },
  {
    id: '48',
    question: 'This sign prohibits you from:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fdo-not-stop-between-hours.gif?alt=media&token=77f67479-0440-4266-b6bc-4a623ca307a5',
    suggestions: [],
    options: [
      {option: 'parking there between 09:00 and 16:00', correct: false},
      {option: 'stopping there at certain hours', correct: true},
      {option: 'using that section of the road during certain hours', correct: false}
    ]
  },
  {
    id: '50',
    question: 'This road sign warns you about what ahead?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Froadcrossing-ahead.gif?alt=media&token=a11838b4-53ec-40bb-84a1-d7a72456c344',
    suggestions: [],
    options: [
      {option: 'a first-aid post', correct: false},
      {option: 'A roads that crosses', correct: true},
      {option: 'a railway crossing', correct: false}
    ]
  },
  {
    id: '55',
    question: 'This sign shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fpedestrian-crossing.gif?alt=media&token=2571af5b-2d07-4cf8-a76e-824e4903be66',
    suggestions: [],
    options: [
      {option: 'there might be pedestrians ahead', correct: false},
      {option: 'there is a pedestrian crossing ahead', correct: true},
      {option: 'there might be school children on or near the road', correct: false}
    ]
  },
  {
    id: '56',
    question: 'What does this warning sign show you ?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Froad-crossing-ahead.gif?alt=media&token=9b0d2066-f172-44de-b3a5-c58571b2f817',
    suggestions: [],
    options: [
      {option: 'A 4-way stop will be found ahead where the roads cross.', correct: false},
      {option: 'Roads crossing ahead and you may have to stop or yield at the intersection.', correct: true},
      {option: "A railway line intersects with the road that you are travelling on.", correct: false}
    ]
  },
  {
    id: '58',
    question: 'This sign with two arrows shows you that there',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Ftwo-waytraffic.gif?alt=media&token=383405b4-83c7-4e52-98c7-a6d2faf484cc',
    suggestions: [],
    options: [
      {option: 'is two way traffic at the following road that crosses the road you are on', correct: false},
      {option: 'are two lanes ahead in different directions.', correct: false},
      {option: 'is two-way traffic ahead on the one-way road you are on', correct: true}
    ]
  },
  {
    id: '59',
    question: 'This blue sign shows you that you:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fcompulsory-right.gif?alt=media&token=f67419ef-452b-4888-8185-60543a96843e',
    suggestions: [],
    options: [
      {option: 'can expect a sharp turn to the right', correct: false},
      {option: 'must turn right at the next road', correct: true},
      {option: 'will get a one-way road to the right', correct: false}
    ]
  },
  {
    id: '61',
    question: 'This sign shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Froad-narrows.gif?alt=media&token=edb17fab-aa2c-45db-b686-c96bb8034b24',
    suggestions: [],
    options: [
      {option: 'there is a narrow bridge ahead', correct: false},
      {option: 'the roads narrow from both sides', correct: true},
      {option: 'the freeway ends', correct: true}
    ]
  },
  {
    id: '62',
    question: 'This blue sign with a left arrow indicates that you:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fmust-turn-left.gif?alt=media&token=7f8ddd6c-2c82-488b-9c87-d0647f3c9d3e',
    suggestions: [],
    options: [
      {option: 'can expect a sharp bend to the left.', correct: false},
      {option: 'must turn left at the next road.', correct: true},
      {option: 'will get a one-way road to the left.', correct: false}
    ]
  },
  {
    id: '65',
    question: 'This road signs warns you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fspeed-bumpwarning.gif?alt=media&token=86c63efd-377a-4bac-b12c-2f5727b79b7e',
    suggestions: [],
    options: [
      {option: 'there are potholes in the road.', correct: false},
      {option: 'there are speed humps on the road.', correct: true},
      {option: 'the road is uneven.', correct: false}
    ]
  },
  {
    id: '66',
    question: 'This warning sign shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Froad-ends-due-to-water.gif?alt=media&token=8faa018c-af94-4cfe-9bd0-4cf77fb02ed9',
    suggestions: [],
    options: [
      {option: 'there is a low level bridge ahead', correct: false},
      {option: 'the road ahead ends due to water', correct: true},
      {option: 'there is a possibility of a flood ahead', correct: false}
    ]
  },
  {
    id: '69',
    question: 'When you see this sign, you must slow down because:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fmotor-gate-on-left.gif?alt=media&token=e77f4f8e-868a-427f-bf44-f7ae08724ab7',
    suggestions: [],
    options: [
      {option: 'there is a dual track railway line in font.', correct: false},
      {option: 'the surface of the road is uneven on the left-hand side.', correct: false},
      {option: 'there is a motor gate on the left-hand side of the road.', correct: true}
    ]
  },
  {
    id: '70',
    question: 'This road marking shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fdo-not-cross-this-line.gif?alt=media&token=edd050e2-349c-4e11-98e7-80e0864707d8',
    suggestions: [],
    options: [
      {option: 'traffic may not pass or cross it on either side', correct: true},
      {option: 'it is a lane reserved for buses only', correct: false},
      {option: 'the road surface is uneven', correct: false}
    ]
  },
  {
    id: '78',
    question: 'What does sign this sign show you?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fonly-one-vehicle-may-pass.gif?alt=media&token=7fdbe68a-4544-437b-97ac-3c7d2b1b477e',
    suggestions: [],
    options: [
      {option: 'Only one vehicle can pass through the obstacles ahead.', correct: true},
      {option: 'The road temporarily narrows from both sides.', correct: false},
      {option: 'The freeway temporarily ends ahead.', correct: false}
    ]
  },
  {
    id: '79',
    question: 'When you see this sign you must:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fpedestrians-have-right-of-way.gif?alt=media&token=9e3878e3-d64e-4db3-aa09-f5e85724ca01',
    suggestions: [],
    options: [
      {option: 'stop, because school children might walk across the road', correct: false},
      {option: 'know that part of the road is only for pedestrians', correct: false},
      {option: 'give right of way to pedestrians crossing the road', correct: true}
    ]
  },
  {
    id: '81',
    question: 'This road sign warns you that the road:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/slippery.jpg?alt=media&token=970b2abf-90c7-4873-a896-cfd84a23792e',
    suggestions: [],
    options: [
      {option: 'has a lot of curves', correct: false},
      {option: 'surface is damaged', correct: false},
      {option: 'is slippery when wet', correct: true}
    ]
  },
  {
    id: '84',
    question: 'This road sign warns you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Ftraffic-light-ahead.gif?alt=media&token=fb373d26-8c33-4457-a99d-635d0aeae619',
    suggestions: [],
    options: [
      {option: 'you are in an urban area', correct: false},
      {option: 'there is a compulsory police stop ahead', correct: false},
      {option: 'there is a traffic light ahead', correct: true}
    ]
  },
  {
    id: '86',
    question: 'What does this warning sign show you?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fpotholes-ahead.gif?alt=media&token=c160e62f-ffc3-4b81-88e7-c460ad20d1af',
    suggestions: [],
    options: [
      {option: 'The road is ending a heading', correct: false},
      {option: 'Potholes are found on the road ahead.', correct: true},
      {option: 'The road on which you are driving is going to change to a gravel road.', correct: false}
    ]
  },
  {
    id: '87',
    question: 'What does this warning sign show you?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fconcealed-entrance.gif?alt=media&token=737f01a8-7737-4195-a95c-35e9eab2c9a6',
    suggestions: [],
    options: [
      {option: 'a concealed entrance from the left, followed by one form the right', correct: true},
      {option: 'sharp curves ahead.', correct: false},
      {option: 'a winding road ahead', correct: false}
    ]
  },
  {
    id: '89',
    question: 'This sign tells you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fspecial-permision.gif?alt=media&token=8f2d11ca-466d-46ca-9912-8e248b28840c',
    suggestions: [],
    options: [
      {option: 'no vehicles may drive there because only pedestrians may walk there.', correct: false},
      {option: 'it shows two-way traffic ahead.', correct: false},
      {option: 'you may only drive there if you have special permission.', correct: true}
    ]
  },
  {
    id: '97',
    question: 'When you see this sign, you must:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fagricultural-vehicles.gif?alt=media&token=1dd987cb-9470-4fcc-b80e-50a63258a463',
    suggestions: [],
    options: [
      {option: 'Be on the lookout for agricultural vehicles which might be on the road', correct: true},
      {option: 'Know that only agricultural vehicles may drive there', correct: false},
      {option: 'Be on the lookout for road-works where tractors work', correct: false}
    ]
  },
  {
    id: '100',
    question: 'This warning road sign shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Flow-water-bridge.gif?alt=media&token=97c54caa-306f-4e7e-9f10-0bc170c748dd',
    suggestions: [],
    options: [
      {option: 'The road end because of water ahead.', correct: false},
      {option: 'There is a possibility of a flood ahead.', correct: false},
      {option: 'There is a low water bridge ahead.', correct: true}
    ]
  },
  {
    id: '101',
    question: 'This warning road sign shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fgravel-road.gif?alt=media&token=77b5f3a0-56ad-49ef-96b2-52b45521b469',
    suggestions: [],
    options: [
      {option: 'The road you are travelling on will become a gravel road', correct: true},
      {option: 'The road ahead ends', correct: false},
      {option: 'You will get potholes on the road ahead', correct: false}
    ]
  },
  {
    id: '103',
    question: 'When you see this sign ahead, you must',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fturn-left-or-right.gif?alt=media&token=04131b30-e70d-41fc-8a65-e9a80458c423',
    suggestions: [],
    options: [
      {option: 'Be ready to stop and turn left or right', correct: true},
      {option: 'When you want to drive on straight ignore it because traffic from the sides must stop.', correct: false},
      {option: 'Choose to turn left or right or drive on straight after you have stopped.', correct: false}
    ]
  },
  {
    id: '104',
    question: 'What does this sign show you?',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fmaximum-speed-at-night.gif?alt=media&token=4075fd9d-906d-4608-b0d2-1c57679e0847',
    suggestions: [],
    options: [
      {option: 'You may not drive faster than 100 km/h at night', correct: true},
      {option: 'Dangerous conditions for the next 100 km', correct: false},
      {option: 'If you cannot see further then 100 km ahead, you must switch on your headlights', correct: false}
    ]
  },
  {
    id: '112',
    question: 'When you see this road sign, you know that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2F10ton-prohibited.gif?alt=media&token=43257397-4b3a-4de1-8a2a-e1b379b61714',
    suggestions: [],
    options: [
      {option: 'A vehicle with a mass of 10 ton and more may not drive there', correct: false},
      {option: 'Part of the road can only carry vehicles that weigh 10 ton', correct: false},
      {option: 'A vehicle with a mass of 10 ton and less may not drive there', correct: true}
    ]
  },
  {
    id: '113',
    question: 'This sign shows you that there is a/an:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fobstruction.gif?alt=media&token=e05a8c8c-b690-406c-9923-b20a8fdb2851',
    suggestions: [],
    options: [
      {option: 'Detour to the right', correct: false},
      {option: 'Obstruction to the right of the road', correct: true},
      {option: 'Curve to the right ahead', correct: false}
    ]
  },
  {
    id: '119',
    question: 'This sign shows you the:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fminimum-speed.gif?alt=media&token=2c35e36c-6c0c-4462-8c40-a0788c5a167d',
    suggestions: [],
    options: [
      {option: 'Slowest speed that you may drive', correct: true},
      {option: 'Distance to the next off-ramp', correct: false},
      {option: '8Fastest speed that you may drive', correct: false}
    ]
  },
  {
    id: '120',
    question: 'The sign show you:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fsharp%20curve%20to%20the%20left.gif?alt=media&token=fef8a609-b10c-49bd-8746-33ddb223961c',
    suggestions: [],
    options: [
      {option: 'A sharp curve to the left ahead', correct: true},
      {option: 'An obstruction left of the road', correct: false},
      {option: 'a de-tour to the left', correct: false}
    ]
  },
  {
    id: '125',
    question: 'This road sign shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fright%20cul%20de%20sac.gif?alt=media&token=e8328e7b-9fc0-48e1-828b-d28db330f543',
    suggestions: [],
    options: [
      {option: 'There is a T-junction to the right', correct: false},
      {option: 'You may not turn right there', correct: false},
      {option: 'The road turning to the right, ends ahead', correct: true}
    ]
  },
  {
    id: '128',
    question: 'This road sign shows you that:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fleft%20turn%20road%20ends.gif?alt=media&token=fa4d7ef8-5ed9-4e4e-aab4-2773ce1afd69',
    suggestions: [],
    options: [
      {option: 'The road turning to the left ends ahead', correct: true},
      {option: 'There is a T-junction on the left', correct: false},
      {option: 'You are not allowed to turn left there', correct: true}
    ]
  },
  {
    id: '129',
    question: 'This road sign shows you:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Ftemporary%20obstruction%20left.gif?alt=media&token=9772c4c7-e66a-4d55-9d24-276f7c47b913',
    suggestions: [],
    options: [
      {option: 'A sharp curve to the left ahead', correct: false},
      {option: 'There is a temporary obstruction left of the road', correct: true},
      {option: 'There is a temporary de-tour to the left', correct: false}
    ]
  },
  {
    id: '131',
    question: 'This stop sign shows you that you must:',
    image: 'https://firebasestorage.googleapis.com/v0/b/step-drive-95bbe.appspot.com/o/quiz%20images%2Fstop%20sighn%20yield%20left.gif?alt=media&token=46f5a66d-30e3-4760-b5b8-308c0cb35cbe',
    suggestions: [],
    options: [
      {option: 'Turn left at the stop sign', correct: false},
      {option: 'Stop and then turn left or drive straight on', correct: false},
      {option: 'Stop, but if you want to turn left, you can use it as a yield sign', correct: true}
    ]
  },
]
  db = firebase.firestore();
  storage = firebase.storage().ref();
  display = false;
  @ViewChild('map') mapElement: ElementRef;
  // @ViewChild('list') list: ElementRef;
  map: any;
 // restriction for the map
 users = [];
 SOUTH_AFRICAN_BOUNDS = {
  north: -21.914461,
  south: -35.800139,
  west: 15.905430,
  east: 34.899504
}
height = 50;
mapCenter = {
  lng: 0,
  lat: 0
}

  constructor(public navCtrl: NavController, public geolocation: Geolocation, private element: ElementRef, private renderer: Renderer2, private platform: Platform) { }

  ionViewDidLoad(){
    this.loadMap();
    this.getusers();
  }
  swipeUp() {
    this.display = !this.display;
  }
  async loadMap(){
    let location;
    var ref = this;
    // let watch = this.geolocation.watchPosition();
    await this.geolocation.getCurrentPosition().then((resp) => {


      this.mapCenter.lat = resp.coords.latitude;
      this.mapCenter.lng = resp.coords.longitude;
      let data = {
        coords: {
          lng: resp.coords.longitude,
          lat: resp.coords.latitude
        },
        content: 'You'
      }
      console.log('Phone Location ', data);
      this.addMarker(data);
    }).catch((err) => {
      this.mapCenter.lat = -29.465306;
      this.mapCenter.lng = 24.741967;
      console.log('Geo Error: ', err);
    })

    let mapOptions = {
      center: this.mapCenter,
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      restriction: {
        latLngBounds: this.SOUTH_AFRICAN_BOUNDS,
        strictBounds: true
      }
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }
  // add marker function
  addMarker(props) {
    // add marker
    const marker = new google.maps.Marker({
      position: props.coords,
      map: this.map,
    })
    // check for custom icon
    if(props.iconImage) {
      // set custom icon
      marker.setIcon(props.iconImage)
    }

    // check for content
    if(props.content) {
      // set custom content
     let infoWindow = new google.maps.InfoWindow({
       content: `<h5 style="margin:0;padding:0;">${props.name} </h5>`+props.content
     });
     marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
     })
    }
  }
  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
  getusers(){
    this.db.collection('users').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        this.users.push(doc.data());
        this.addMarker(doc.data());
      })
      console.log('Users: ', this.users);

    })
  }
}
export interface QUESTIONS {
  id: string;
  question: string;
  image: string;
  suggestions:any [];
  options: [
    {option: string, correct: boolean},
    {option: string, correct: boolean},
    {option: string, correct: boolean}
  ]
}
