export default {
    header: {
        name: 'Model Evaluation',
        home: 'Home',
        evaluation: 'Evaluation',
        optimization: 'Optimization',
        market: 'Model Market',
        logAndReg: 'Sign In',
        langSelect: 'English',
        search: 'search'
    },
    propertiesDesc: {
        correctnessDesc: 'In our model correctness evaluation, we provide 11 distinct evaluation perspectives, each comprising multiple evaluation metrics. Specifically, we categorize these perspectives into three types: value-oriented, things-oriented, and image-oriented. Value-oriented evaluation perspectives include three types: value similarity, value difference, and value distribution. Things-oriented evaluation perspectives encompass six types, divided into internal attributes (boundary, plane, quality) and external attributes (position, category, scale). Image-oriented evaluation perspectives include two types: image fidelity and image diversity. The covered tasks include image classification, image segmentation, and more.',
        fairnessDesc: 'The fairness evaluation framework for computer vision integrates three key dimensions: Inter-Attribute, Inter-Class, and Intra-Class. Prior to evaluation, all sensitive attribute labels relevant to the task must be identified, and the test dataset should be preprocessed using generative models to obtain the latent space perturbation range. The Inter-Attribute dimension assesses the fairness of task-specific attributes across different sensitive attribute scenarios, determining the overall impact of sensitive attributes on the task. The Inter-Class dimension analyzes the effect of different categories within sensitive attributes on task-specific attributes, identifying the impact of discrete sub-attributes. The Intra-Class dimension examines the impact of variations within a single sensitive attribute on task-specific attributes, determining the influence of the continuous subspace of sensitive attributes. By integrating these three evaluations, our framework provides a detailed understanding of model biases and performance impacts, rigorously assessing fairness across different contexts and dimensions, ultimately promoting the development of fairer AI systems.',
        robustnessDesc: "Robustness of a model refers to its ability to maintain prediction accuracy, effectiveness, and consistency when faced with unknown inputs. Our platform evaluates the robustness of models from three perspectives: input, output, and neurons. From the output perspective, robustness is quantified by applying perturbations to the input data and observing changes in model performance. These perturbations include adversarial attacks, image corruption, and natural distribution shifts. From the input perspective, robustness is evaluated by using heuristic algorithms to calculate the distance from data points to the model's decision boundary. From the neuron perspective, robustness is assessed by calculating neuron uncertainty. Through these methods, we can comprehensively evaluate and understand the robustness of a model.",
        transferabilityDesc:'Estimated transferability methods offer a proactive approach to model selection. These methods provide insights into how well a model is likely to perform in a new domain before extensive fine-tuning, enhancing the reliability and efficiency of transfer learning.Our platform offers a comprehensive transferability evaluation framework that analyzes and predicts model transferability using four perspectives: Minimal Data Distribution Distance, Probability Distribution Distance, Lablewise Feature Similarity, and Structural Similarity. Each perspective includes various evaluation methods. By integrating these four types of scores, we can thoroughly assess the transferability of models to downstream tasks, helping you quickly find the best model for your needs.',
        correctnessIntro: 'In our model correctness evaluation, we provide 11 distinct evaluation perspectives, each comprising multiple evaluation metrics. Specifically, we categorize these perspectives into three types: value-oriented, things-oriented, and image-oriented. ',
        fairnessIntro: 'The fairness evaluation framework for computer vision integrates three key dimensions: Inter-Attribute, Inter-Class, and Intra-Class. Prior to evaluation, all sensitive attribute labels relevant to the task must be identified, and the test dataset should be preprocessed using generative models to obtain the latent space perturbation range.',
        robustnessIntro: 'Robustness of a model refers to its ability to maintain prediction accuracy, effectiveness, and consistency when faced with unknown inputs. Our platform evaluates the robustness of models from three perspectives: input, output, and neurons. From the output perspective, robustness is quantified by applying perturbations to the input data and observing changes in model performance. ',
        transferabilityIntro: 'The transferability assessment framework provides four available evaluation perspectives for comprehensive analysis and prediction of model transferability: Minimal Data Distribution Distance, Probability Distribution Distance, Lablewise Feature Similarity, and Structural Similarity. Each perspective includes various evaluation methodsProbability Distribution Distance, Lablewise Feature Similarity, and Structural Similarity.',
    },
    footer: {
        maintainers: 'Maintainers'
    },
    detail: {
        stayTuned: 'Stay Tuned...'
    },
    title: {
        introduction: 'Introduction',
        properties:'Properties',
        leaderBoard:'LeaderBoard',
        pipeline:'Pipeline',
        paper:'Paper',
    },
    commonUpper: {
        correctness: "Correctness",
        robustness: "Robustness",
        fairness: "Fairness",
        transferability: "Transferability",
        more: "More"
    },
    commonLower: {
        correctness: "correctness",
        robustness: "robustness",
        fairness: "fairness",
        transferability: "transferability",
        more: "more"
    },
    evaluation: {
        introduction: 'Introduction',
        properties:'Properties',
        leaderBoard:'LeaderBoard',
        pipeline:'Pipeline',
        introInfo: "Welcome to our Model Evaluation Platform! Based on our comprehensive survey (see the bottom of the website), our platform offers extensive model evaluation capabilities, encompassing attributes such as correctness, robustness, fairness, and transferability. Each attribute includes a variety of evaluation perspectives and metrics to help users thoroughly assess the performance of their models. In each attribute's evaluation, users can flexibly customize the visual tasks, datasets, evaluation metrics, and model parameters involved. Additionally, our platform supports the visualization of evaluation results, providing users with an intuitive understanding of model performance and strong support for model improvement and optimization. Currently, our platform supports the evaluation and performance comparison of key tasks in computer vision, including image classification, object detection, and image segmentation. In the future, we will continue to expand the platform's features and supported scope to keep pace with the ever-evolving deep learning technologies and application needs, providing users with more comprehensive and powerful services.",
        propertiesInfo : 'The platform currently supports evaluation of model performance in terms of Correctness, Robustness, Fairness, and Transferability.'
    },
    modelTable: {
        model: 'Model',
        modelName: 'Model Name',
        applicableTasks: 'Applicable Tasks',
        description: 'Description',
        user: 'User',
        paperLink: 'Paper Link',
        codeLink:'Code Link',
        uploadTime:'Upload Time',
        updateTime:'Update Time',
    },
    datasetTable: {
        dataset: 'Dataset',
        datasetName: 'Dataset Name',
        applicableTasks: 'Applicable Tasks',
        description: 'Description',
        user: 'User',
        paperLink: 'Paper Link',
        codeLink:'Code Link',
        uploadTime:'Upload Time',
        updateTime:'Update Time',
    },
    paramTable: {
        paramName: 'Checkpoint Name',
        description: 'Description',
        architecture: 'architecture',
        user: 'User',
        uploadTime:'Upload Time',
    },
    optimizationTable: {
        optimization: 'Optimization',
    },
    accountTable: {
        account: 'Account',
        baseInfo: 'Basic Information',
        username: 'Username',
        institution: 'Institution',
        title: 'Title',
        homepage: 'Homepage'
    },
    operate: {
        edit: 'edit',
        save: 'save',
        cancel: 'cancel',
        pre: 'pre',
        next: 'next',
        detail: 'detail',
        startTask: 'start task',
        goEvaluate: 'Go Evaluation',
        viewDetail:'detail'
    },
    leaderBoard: {
        task: '-Task-',
        dataset: '-Dataset-',
        aspect: '-Property-',
        empty: 'empty',
        modelName: 'Model Name',
        evaluationResult: 'Evaluation Result',
        parameterName: 'Parameter Name',
        user: 'User',
        paperLink: 'Paper Link',
        codeLink:'Code Link',
        operate:'Operate',
    },
    creator: {
        steps:{
            env: 'Select Environment',
            task: 'Select Task',
            metric: 'Select Evaluation Metric',
            arc: 'Select Model Architecture',
            param: 'Select Model Checkpoint',
            dataset: 'Select Dataset',
            evaluate: 'Evaluate'
        },
        metric: {
            selectTitle: 'Select Evaluation Metric',
        },
        arch: {
            selectTitle: 'Select Model Arch',
            modelDescription: 'Model Description',
            upload: 'Go Upload'
        },
        dataset: {
            selectTitle: 'Select Dataset',
            datasetDescription: 'Dataset Description',
            upload: 'Go Upload'
        },
        param:{
            selectTitle: 'Select Checkpoint',
            paramDescription: 'Checkpoint Description',
            drag:'Drag here,or ',
            click:'Click',
            tip1:'Note: Only files in',
            tip2:'.pt',
            tip3:' or ',
            tip4:'.pth',
            tip5:' format are accepted'
        },
        evaluate:{
            title: 'All Options',
            env: 'Environment',
            task: 'Task type',
            metric: 'Metrics',
            model: 'Model',
            param:'Checkpoint',
            dataset: 'Dataset',
            datasetDetail: 'Dataset Detail',
            modelDetail: 'Model Detail',
            parameterDetail: 'Checkpoint Detail'
        }
    },
    user: {
        model: 'Model',
        dataset: 'Dataset',
        optimization: 'Optimization',
        account: 'Account'
    },
    evaluating: {
        progress: 'evaluating progress'
    },
    evaluateResult: {
        state: 'State',
        task: 'Task type',
        model: 'Model',
        param:'Checkpoint',
        dataset: 'Dataset',
        title: 'Evaluation Result',
        error:'Evaluation Error',
        perspectives: 'Perspectives',
        metrics: 'Metrics',
        result: 'Result',
        inprocess: 'In Process',
        errer: 'Failed',
        finish: 'Finish',
        result: 'Result'
    },

    temp: {
        modelDoctor: "Model Doctor",
        modelDoctorDesc: "Optimizing your model with gradient aggregation strategy.",
        paper: "Paper📑",
        launch: "Demo🚀",
        modelSelectLabel: "Model",
        modelSelectPlaceholder: "Select a model",
        datasetSelectLabel: "Dataset",
        datasetSelectPlaceholder: "Select a dataset",
    }


}
