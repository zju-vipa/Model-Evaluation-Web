<template>
    <div class="table-container">
        <div class="title">{{$t("modelTable.model")}}</div>
        <div class="table-box">
            <el-table
                :data="modelAll?modelAll.slice((currentPage - 1) * pageSize, currentPage * pageSize):[]"
                height="480"
                :header-cell-style="{background:'#fafafa',color:'#000', fontSize: '16px', lineHeight:'30px'}"
                :header-row-style="{height: '60px'}"
                :row-style="{height: '60px', background:'#ffffff',lineHeight:'30px'}">
            <el-table-column fixed="left" prop="name" :label="$t('modelTable.modelName')" width="150" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="task" :label="$t('modelTable.applicableTasks')" width="180" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column :label="$t('modelTable.description')" width="300" align="center">
                <template #default="{ row }">
                    <el-tooltip :content="row.description" placement="top" effect="light">
                        <div class="ellipsis">{{ row.description }}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column :label="$t('modelTable.paperLink')" width="300" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div class="link" @click="redirectToPage(scope.row.paper_link)">{{scope.row.paper_link}}</div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('modelTable.codeLink')" width="300" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div class="link" @click="redirectToPage(scope.row.code_link)">{{scope.row.code_link}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="upload_time" :label="$t('modelTable.uploadTime')" width="150" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="update_time" :label="$t('modelTable.updateTime')" width="150" align="center" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
            <el-pagination
                    hide-on-single-page
                    background
                    layout="prev, pager, next, jumper, ->, total"
                    :total="modelAll?modelAll.length:0"
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
    name: "Model",
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
        ...mapState(['modelAll'])
    },
};
</script>

<style lang="scss" scoped>
@import "common";
</style>

<style lang="scss">
    /* tooltip三角箭头部分 */
    .el-tooltip__popper[x-placement^=top] .popper__arrow {
        border-top-color: #fff !important;
    }
    .el-tooltip__popper[x-placement^=top] .popper__arrow:after {
        border-top-color: #fff !important;
    }

    .el-tooltip__popper[x-placement^=bottom] .popper__arrow {
        border-bottom-color: #fff !important;
    }
    .el-tooltip__popper[x-placement^=bottom] .popper__arrow:after {
        border-bottom-color: #fff !important;
    }

    .el-tooltip__popper[x-placement^=right] .popper__arrow {
        border-right-color: #fff !important;
    }
    .el-tooltip__popper[x-placement^=right] .popper__arrow:after {
        border-right-color: #fff !important;
    }

    .el-tooltip__popper[x-placement^=left] .popper__arrow {
        border-left-color: #fff !important;
    }
    .el-tooltip__popper[x-placement^=left] .popper__arrow:after {
        border-left-color: #fff !important;
    }

    /* tooltip主体部分 */
    .el-tooltip__popper{
        font-size: 18px;
        background-color: #fff !important;
        color: #303133 !important;
        max-width:30% !important;
        border-radius: 4px !important;
        border-color:#e6e6e6 !important;
        box-shadow: 0px 0px 7px 0px rgba(42, 42, 42, 0.2) !important;
    }

    .el-table_1_column_1{
        font-weight: bolder !important;
    }
</style>