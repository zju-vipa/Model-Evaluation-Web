export default {
    detail: {
        stayTuned: '敬请期待...'
    },
    propertiesDesc: {
        correctnessDesc: '在模型正确性评估中，我们提供了11种不同的评估视角来评估模型，每种评估视角下包含多个评估指标。具体来说，我们将评估视角划分为三种类型：面向值的、面向事物的、面向图像的。面向值的评估视角包括值相似性、值差异性和值分布3种评估视角。面向事物的评估视角包括事物的内部属性（边界、平面、质量）和外部属性（位置、类别、尺度）共6种评估视角。面向图像的评估视角包括图像保真度、图像多样性共2种评估视角。覆盖的任务包括图像分类、图像分割等。',
        fairnessDesc: '计算机视觉公平性评估框架结合属性间、类间和类内三个关键维度来评估计算机视觉模型的公平性。评估前需要根据任务场景明确需要评估的所有敏感属性标签，并通过生成模型预处理测试数据集得到隐空间扰动范围。属性间维度评估任务特定属性在不同敏感属性场景中的公平性，确定敏感属性对任务的整体影响。类间维度分析不同敏感属性类别对任务特定属性的影响，确定敏感属性离散子属性对任务的影响。类内维度则检查单一敏感属性类内的变化对任务特定属性的影响，确定敏感属性连续子空间对任务的影响。通过综合这三类评估，我们的框架提供了对模型偏见和性能影响的详细理解，在不同背景和维度上严格评估公平性，最终促进更公平的人工智能系统的开发。',
        robustnessDesc: '模型的鲁棒性指的是在面对未知输入时，模型能够保持预测的准确性、有效性和一致性的能力。本平台从输入、输出和神经元三个角度对模型的鲁棒性进行评估。从输出角度，评估方法是在输入数据上施加扰动，然后通过观察模型性能的变化来量化其鲁棒性。这些扰动包括对抗攻击（Adversarial Attack）、图像损坏（Corruption）和自然分布偏移（Natural Distribution Shift）。从输入角度，评估方法是使用启发式算法计算数据点到模型分类边界的距离。从神经元角度，评估方法是计算神经元的不确定性（Neuron Uncertainty）。通过这些方法，我们可以全面评估和理解模型的鲁棒性。',
        transferabilityDesc:'预测可迁移性方法提供了一种主动的模型选择方法。这些方法在广泛微调之前提供了模型在新领域中可能表现良好的洞察，从而提高了迁移学习的可靠性和效率。可迁移性评估框架提供了4种可用的评估视角对模型的可迁移性进行全面分析和预测，视角包括最小数据分布距离，概率分布距离，基于标签的特征相似性和结构相似性，每种视角均包括多种评估方法。综合这4类评分，能够综合权衡模型到下游任务的迁移能力，快速找到最适合您需求的模型。',
        correctnessIntro: '在模型正确性评估中，我们提供了11种不同的评估视角来评估模型，每种评估视角下包含多个评估指标。具体来说，我们将评估视角划分为三种类型：面向值的、面向事物的、面向图像的。',
        fairnessIntro: '计算机视觉公平性评估框架结合属性间、类间和类内三个关键维度来评估计算机视觉模型的公平性。评估前需要根据任务场景明确需要评估的所有敏感属性标签，并通过生成模型预处理测试数据集得到隐空间扰动范围。',
        robustnessIntro: '模型的鲁棒性指的是在面对未知输入时，模型能够保持预测的准确性、有效性和一致性的能力。本平台从输入、输出和神经元三个角度对模型的鲁棒性进行评估。从输出角度，评估方法是在输入数据上施加扰动，然后通过观察模型性能的变化来量化其鲁棒性。',
        transferabilityIntro: '可迁移性评估框架提供了4种可用的评估视角对模型的可迁移性进行全面分析和预测，视角包括最小数据分布距离，概率分布距离，基于标签的特征相似性和结构相似性，每种视角均包括多种评估方法。',
    },
    header: {
        name: '模型评估平台',
        home: '主页',
        evaluation: '评估',
        optimization: '优化',
        market: '模型市场',
        logAndReg: '登陆',
        langSelect:'简体中文',
        search: 'search'
    },
    footer: {
        maintainers: '维护成员'
    },
    title: {
        introduction: '平台简介',
        properties:'评估属性',
        leaderBoard:'模型榜单',
        pipeline:'流程',
        paper:'论文',
    },
    commonUpper: {
        correctness: "正确性",
        robustness: "鲁棒性",
        fairness: "公平性",
        transferability: "可迁移性",
        more: "更多"
    },
    evaluation: {
        introduction: '介绍',
        properties:'评估属性',
        leaderBoard:'模型榜单',
        pipeline:'流程',
        introInfo: '欢迎来到模型评估平台！本平台基于我们详细调研的综述（见网站下方），提供了包括正确性、鲁棒性、公平性、迁移性等属性在内的全面模型评估功能。每种属性包含丰富的评估视角和评估指标，帮助用户全面评估模型的性能。在每种属性的模型评估中，用户可以灵活自定义模型涉及的视觉任务、数据集、评估指标和模型参数。此外，本平台支持对模型评估结果的可视化展示，让用户直观了解模型的性能，为模型的改进和优化提供有力支持。目前，本平台已支持对计算机视觉场景下的图像分类、目标检测和图像分割等核心任务进行模型评估和性能比较。未来，我们将继续扩展平台的功能和支持范围，以应对不断发展的深度学习技术和应用需求，为用户提供更全面、更强大的服务。',
        propertiesInfo : '平台目前已支持对模型在正确性、鲁棒性、公平性和可迁移性等方面的表现进行测评。'
    },
    modelTable: {
        model: '模型',
        modelName: '模型名称',
        applicableTasks: '适用任务',
        description: '描述',
        user: '用户',
        paperLink: '论文链接',
        codeLink:'代码链接',
        uploadTime:'上传时间',
        updateTime:'更新时间',
    },
    datasetTable: {
        dataset: '数据集',
        datasetName: '数据集名称',
        applicableTasks: '适用任务',
        description: '描述',
        user: '用户',
        paperLink: '论文链接',
        codeLink:'代码链接',
        uploadTime:'上传时间',
        updateTime:'更新时间',
    },
    paramTable: {
        paramName: '权重名称',
        description: '描述',
        architecture: '模型架构',
        user: '用户',
        uploadTime:'上传时间',
    },
    optimizationTable: {
        optimization: '优化',
    },
    accountTable: {
        account: '账户',
        baseInfo: '基本信息',
        username: '用户名',
        institution: '机构',
        title: '头衔',
        homepage: '个人主页'
    },
    operate: {
        edit: '编辑',
        save: '保存',
        cancel: '取消',
        pre: '上一步',
        next: '下一步',
        detail: '详情',
        startTask: '启动任务',
        goEvaluate: '前往评估',
        viewDetail:'查看'
    },
    leaderBoard: {
        task: '-任务-',
        dataset: '-数据集-',
        aspect: '-评估属性-',
        empty:'暂无',
        modelName: '模型名称',
        evaluationResult: '评估结果',
        parameterName: '参数名称',
        user: '用户',
        paperLink: '论文链接',
        codeLink:'代码链接',
        operate:'操作',
    },
    creator: {
        steps:{
            env: '选择环境',
            task: '选择任务类型',
            metric: '选择评估指标',
            arc: '选择模型结构',
            param: '选择模型权重',
            dataset: '选择数据集',
            evaluate: '评估'
        },
        metric: {
            selectTitle: '选择评估指标'
        },
        arch: {
            selectTitle: '选择模型结构',
            modelDescription: '模型描述',
            upload: '上传'
        },
        dataset: {
            selectTitle: '选择数据集',
            datasetDescription: '数据集描述',
            upload: '上传'
        },
        param:{
            selectTitle: '选择权重',
            paramDescription: '权重描述',
            drag:'拖拽到此,或 ',
            click:'点击',
            tip1:'注意: 只有',
            tip2:'.pt',
            tip3:' 或 ',
            tip4:'.pth',
            tip5:' 格式的文件可以被接收'
        },
        evaluate:{
            title: '全部选项',
            env: '环境',
            task: '任务类型',
            metric: '评估指标',
            model: '模型',
            param: '权重',
            dataset: '数据集',
            datasetDetail: '数据集详情',
            modelDetail: '模型详情',
            parameterDetail: '权重详情'
        }
    },
    user: {
        model: '模型',
        dataset: '数据集',
        optimization: '优化',
        account: '账户'
    },
    evaluating: {
        progress: '评估进度'
    },
    evaluateResult: {
        state: '当前状态',
        task: '任务类型',
        model: '模型',
        param:'权重',
        dataset: '数据集',
        title: '评估结果',
        error:'评估错误',
        perspectives: '类别',
        metrics: '指标',
        result: '结果',
        inprocess: '进行中',
        errer: '失败',
        finish: '已完成',
        result: '结果'
    },

    temp: {
        modelDoctor: "模型医生",
        modelDoctorDesc: "通过聚合梯度约束策略来“治疗”模型",
        paper: "论文📑",
        launch: "使用🚀",
        modelSelectLabel: "模型",
        modelSelectPlaceholder: "选择模型",
        datasetSelectLabel: "数据集",
        datasetSelectPlaceholder: "选择一个数据集",
    }
}
