    /* initialize jsPsych */
   /* initialize jsPsych */
/* initialize jsPsych */
var jsPsych = initJsPsych({
  on_finish: function() {
    // Generate a unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `results_${timestamp}.json`;

    // Trigger the JSON download
    jsPsych.data.get().localSave('json', filename);

    // Provide feedback to the participant
    document.body.innerHTML = `
      <div style="margin: 100px; text-align: center; font-family: sans-serif;">
        <h2>Dziękujemy za udział w badaniu!</h2>
        <p>Twoje wyniki zostały pobrane jako plik JSON.</p>
      </div>
    `;
  }
});

    /* create timeline */
    var timeline = [];

    /* define welcome message trial */
    var welcome = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: "Naciśnij dowolny klawiszy, żeby rozpocząć."
    };
    //timeline.push(welcome);

    /* define instructions trial */
    //TODO: Co, gdy historia opowiada się sama?
    var instructions = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `
        <p>W tej części badania zostanie wyświetlonych kilka krótkich fragmentów
        nagrania interakcji, w której brałeś/-łaś udział. Po każdym fragmencie
        poprosimy Cię o ocenę czy w danym momencie interakcji:</p>
          <p>Twoje poczucie łączności z drugą osobą malało czy wzrastało?</p>
          <p>Miałeś/-aś wpływ na opowiadaną historię?</p>
          <p>Twój partner miał wpływ na opowiadaną historię?</p>
          <p>Kształtowaliście historię wspólnie?</p>
        <p>Następnie poprosimy Cię o wymienie, jakie emocje czułeś w danym momencie,
        i o próbę odgadnięcia, jakie emocje czuł Twój partner.</p>
        <p>Naciśnij dowolny klawisz, aby rozpocząć.</p>
      `,
      post_trial_gap: 2000
    };
    timeline.push(instructions);

    // connection 
    const qConnection = {
      type: jsPsychHtmlSliderResponse,
      stimulus: "<p><strong>Czy w danym momencie interakcji Twoje poczucie łączności z drugą osobą malało czy wzrastało?</strong></p>",
      labels: [
        "Zdecydowanie malało", "", "", "", "", "Ani malało, ani wzrastało", "", "", "", "", "Zdecydowanie wzrastało"
      ],
      min: 0,
      max: 10,
      slider_start: 0,
      step: 1,
      require_movement: true,
      button_label: "Dalej"
    };

    // self agency 
    const qSelfAgency = {
      type: jsPsychHtmlSliderResponse,
      stimulus: "<p><strong>Czy w danym momencie interakcji miałeś/-aś wpływ na opowiadaną historię?</strong></p>",
      labels: [
        "Zdecydowanie nie", "", "", "", "", "", "", "", "", "", "Zdecydowanie tak"
      ],
      min: 0,
      max: 10,
      slider_start: 0,
      step: 1,
      require_movement: true,
      button_label: "Dalej"
    };

    // other agency 
    const qOtherAgency = {
      type: jsPsychHtmlSliderResponse,
      stimulus: "<p><strong>Czy w danym momencie interakcji Twój partner miał wpływ na opowiadaną historię?</strong></p>",
      labels: [
        "Zdecydowanie nie", "", "", "", "", "", "", "", "", "", "Zdecydowanie tak"
      ],
      min: 0,
      max: 10,
      slider_start: 0,
      step: 1,
      require_movement: true,
      button_label: "Dalej"
    };

    // joint agency 
    const qJointAgency = {
      type: jsPsychHtmlSliderResponse,
      stimulus: "<p><strong>Czy w danym momencie interakcji kształtowaliście historię wspólnie?</strong></p>",
      labels: [
        "Zdecydowanie nie", "", "", "", "","", "", "", "", "", "Zdecydowanie tak"
      ],
      min: 0,
      max: 10,
      slider_start: 0,
      step: 1,
      require_movement: true,
      button_label: "Dalej"
    };

    // emotional accuracy
    var qEmotionalAccuracy = {
      type: jsPsychSurveyText,
      questions: [
        {prompt: 'Jakie emocje czułeś/-aś w danym momencie?', name: 'emotion_self'},
        {prompt: 'Jak Ci się wydaje, jakie emocje czuł Twój partner w tym momencie?', name: 'emotion_other'}
      ],
      button_label: "Dalej",
    }

    videoClips.forEach(clip => {

      timeline.push({
        type: jsPsychVideoKeyboardResponse,
        stimulus: [clip],
        // width: 1280,
        autoplay: true,
        controls: true,
        trial_ends_after_video: true
      });

      timeline.push(qConnection);
      timeline.push(qSelfAgency);
      timeline.push(qOtherAgency);
      timeline.push(qJointAgency);
      timeline.push(qEmotionalAccuracy);
    });

    /* start the experiment */
    jsPsych.run(timeline);
