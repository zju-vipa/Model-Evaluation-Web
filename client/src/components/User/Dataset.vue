<template>
    <div class="table-container">
        <div class="title">{{$t("datasetTable.dataset")}}</div>
        <div class="table-box">
            <el-table
                :data="datasetAll?datasetAll.slice((currentPage - 1) * pageSize, currentPage * pageSize):[]"
                height="480"
                :header-cell-style="{background:'#fafafa',color:'#000', fontSize: '16px', lineHeight:'30px'}"
                :header-row-style="{height: '60px'}"
                :row-style="{height: '60px', background:'#ffffff',lineHeight:'30px'}">
            <el-table-column prop="name" :label="$t('datasetTable.datasetName')" width="150" align="center" :show-overflow-tooltip="true"></el-table-column>
            <!-- <el-table-column prop="task" :label="$t('datasetTable.applicableTasks')" width="150" align="center" :show-overflow-tooltip="true"></el-table-column> -->
            <el-table-column :label="$t('datasetTable.description')" width="400" align="center">
            <template #default="{ row }">
                <el-tooltip :content="row.description" placement="top" effect="light">
                    <div class="ellipsis">{{ row.description }}</div>
                </el-tooltip>
            </template>
            </el-table-column>
            <el-table-column :label="$t('datasetTable.paperLink')" width="380" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div class="link" @click="redirectToPage(scope.row.paper_link)">{{scope.row.paper_link}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="upload_time" :label="$t('datasetTable.uploadTime')" width="150" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="update_time" :label="$t('datasetTable.updateTime')" width="150" align="center" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
            <el-pagination
                    hide-on-single-page
                    background
                    layout="prev, pager, next, jumper, ->, total"
                    :total="datasetAll?datasetAll.length:0"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Dataset",
    data() {
        return {
            currentPage: 1,
            pageSize: 7,
        };
    },
    methods: {
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
        },
        redirectToPage(url) {
            if (url) {
                window.open(url, '_blank'); // 在新标签页中打开链接
            }
        }
    },
    computed: {
        ...mapState(['datasetAll'])
    },
};
</script>

<style lang="scss" scoped>
@import "common";
</style>
