<template>

  <div class="optimization-container">
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>{{ $t("temp.modelDoctor") }}</span>
        </div>
      </template>
      <p>{{ $t("temp.modelDoctorDesc") }}</p>
      <div style="margin-top: 20px;">
        <template>


          <el-dialog :visible.sync="paperDialog" :title="paperData.title" width="800">
            <p>{{ paperData.authors }}</p>
            <br>
            <h2>Abstract</h2>
            <br>
            <p>{{ paperData.abstract }}</p>
            <br>
            <h2>Citation</h2>
            <pre>
                <code>
                  {{ paperData.citation }}
                </code>
              </pre>
          </el-dialog>





          <el-dialog :visible.sync="launchDialog" :title="paperData.title" width="800">
            <el-form :model="form">
              <el-form-item :label="$t('temp.modelSelectLabel')">
                <el-select v-model="form.model_name" :placeholder="$t('temp.modelSelectPlaceholder')" size="large"
                  style="width: 240px">
                  <el-option v-for="item in models" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>

              <el-form-item :label="$t('temp.datasetSelectLabel')">
                <el-select v-model="form.datasets" :placeholder="$t('temp.datasetSelectPlaceholder')" size="large"
                  style="width: 240px">
                  <el-option v-for="item in datasets" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>

              <el-form-item label="Epoch">
                <el-slider v-model="form.num_epoches" :min="50" :max="200"
                  style="width: 240px; margin-left: 30px;"></el-slider>
              </el-form-item>

              <el-button type="primary" @click="onSubmit">Create</el-button>
            </el-form>

          </el-dialog>



          <el-button plain @click="paperDialog = true">{{ $t("temp.paper") }}</el-button>
          <el-button plain @click="launchDialog = true" type="primary">{{ $t("temp.launch") }}</el-button>

        </template>

      </div>

      <template #footer>Footer content</template>
    </el-card>
  </div>
</template>



<script>
import { ref, reactive } from 'vue';
import { startModelDoctor } from '@/models/OptModel'


export default {
  name: "Optimization",
  setup: () => {

    const paperDialog = ref(false);
    const launchDialog = ref(false);

    const paperData = {
      title: "Model Doctor: A Simple Gradient Aggregation Strategy for Diagnosing and Treating CNN Classifiers",
      authors: "Zunlei Feng, Jiacong Hu, Sai Wu, XiaoTian Yu, Jie Song, Mingli Song",
      abstract: "Recently, Convolutional Neural Network (CNN) has achieved excellent performance in the classification task. It is widely known that CNN is deemed as a 'blackbox', which is hard for understanding the prediction mechanism and debugging the wrong prediction. Some model debugging and explanation works are developed for solving the above drawbacks. However, those methods focus on explanation and diagnosing possible causes for model prediction, based on which the researchers handle the following optimization of models manually. In this paper, we propose the first completely automatic model diagnosing and treating tool, termed as Model Doctor. Based on two discoveries that 1) each category is only correlated with sparse and specific convolution kernels, and 2) adversarial samples are isolated while normal samples are successive in the feature space, a simple aggregate gradient constraint is devised for effectively diagnosing and optimizing CNN classifiers. The aggregate gradient strategy is a versatile module for mainstream CNN classifiers. Extensive experiments demonstrate that the proposed Model Doctor applies to all existing CNN classifiers, and improves the accuracy of 16 mainstream CNN classifiers by 1%~5%.",
      citation: `
@inproceedings{feng2022model,
  title={Model doctor: A simple gradient aggregation strategy for diagnosing and treating cnn classifiers},
  author={Feng, Zunlei and Hu, Jiacong and Wu, Sai and Yu, Xiaotian and Song, Jie and Song, Mingli},
  booktitle={Proceedings of the AAAI Conference on Artificial Intelligence},
  volume={36},
  number={1},
  pages={616--624},
  year={2022}
}`}

    const form = reactive({
      model_name: '',
      datasets: '',
      num_epoches: 100,
    })

    const models = [
      {
        value: 'simnet',
        label: 'simnet',
      },
      {
        value: 'alexnet',
        label: 'alexnet',
      },
      {
        value: 'vgg16',
        label: 'vgg16',
      },
      {
        value: 'resnet34',
        label: 'resnet34',
      },
      {
        value: 'resnet50',
        label: 'resnet50',
      },
      {
        value: 'senet34',
        label: 'senet34',
      },
      {
        value: 'wideresnet28',
        label: 'wideresnet28',
      },
      {
        value: 'resnext50',
        label: 'resnext50',
      },
      {
        value: 'densenet121',
        label: 'densenet121',
      },
      {
        value: 'simplenetv1',
        label: 'simplenetv1',
      },
      {
        value: 'efficientnetv2s',
        label: 'efficientnetv2s',
      },
      {
        value: 'efficientnetv2l',
        label: 'efficientnetv2l',
      },
      {
        value: 'googlenet',
        label: 'googlenet',
      },
      {
        value: 'xception',
        label: 'xception',
      },
      {
        value: 'mobilenetv2',
        label: 'mobilenetv2',
      },
      {
        value: 'inceptionv3',
        label: 'inceptionv3',
      },
      {
        value: 'shufflenetv2',
        label: 'shufflenetv2',
      },
      {
        value: 'squeezenet',
        label: 'squeezenet',
      },
      {
        value: 'mnasnet',
        label: 'mnasnet',
      },
    ];

    const datasets = [
      {
        value: "cifar10",
        label: "CIFAR10"
      }
    ];

    const onSubmit = () => {
      console.log(form)

      startModelDoctor(form).then(res => {
        console.log(res);
      })


    }

    return {
      paperDialog,
      launchDialog,
      paperData,
      form,
      models,
      datasets,
      onSubmit,
    }
  }
}
</script>

<style lang="scss" scoped>
.optimization-container {
  width: 74%;
  margin: 50px auto 0 auto;

}
</style>
