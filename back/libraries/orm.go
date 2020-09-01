package libraries

import (
	"database/sql"
	"fmt"
	"strings"
)

// ----------------------- ORM BUILD QUERY -----------------------
type ORM struct {
	dataSelect     []string
	dataFrom       string
	dataWhere      []string
	dataOrderBy    []string
	dataJoin       []string
	dataBuilder    string
	dataWhereIndex uint
	dataLimit      string
	dataOffset     string
	dataWhereMap   []interface{}
}

func (then *ORM) Select(data string) *ORM {
	for _, item := range strings.Split(data, ",") {
		then.dataSelect = append(then.dataSelect, strings.Trim(item, "")+"")
	}
	return then
}
func (then *ORM) From(from string) *ORM {
	then.dataFrom = from
	return then
}
func (then *ORM) Where(attr string, symbol string, value interface{}) *ORM {
	then.dataWhereIndex++
	if symbol != "null" {
		then.dataWhere = append(then.dataWhere, fmt.Sprintf("%s %s $%d", attr, symbol, then.dataWhereIndex))
		then.dataWhereMap = append(then.dataWhereMap, value)
	} else {
		then.dataWhere = append(then.dataWhere, fmt.Sprintf("%s %s", attr, value))
	}
	return then
}
func (then *ORM) WhereAnd(attr string, symbol string, value interface{}) *ORM {
	then.dataWhereIndex++
	then.dataWhere = append(then.dataWhere, fmt.Sprintf("%s %s $%d %s", attr, symbol, then.dataWhereIndex, "and"))
	then.dataWhereMap = append(then.dataWhereMap, value)
	return then
}
func (then *ORM) WhereOr(attr string, symbol string, value interface{}) *ORM {
	then.dataWhereIndex++
	then.dataWhere = append(then.dataWhere, fmt.Sprintf("%s %s $%d %s", attr, symbol, then.dataWhereIndex, "or"))
	then.dataWhereMap = append(then.dataWhereMap, value)
	return then
}
func (then *ORM) Order(attr, order string) *ORM {
	then.dataOrderBy = append(then.dataOrderBy, fmt.Sprintf("%s %s", attr, order))
	return then
}
func (then *ORM) Join(from string, on string) *ORM {
	then.dataJoin = append(then.dataJoin, fmt.Sprintf("INNER JOIN %s on %s", from, on))
	return then
}
func (then *ORM) JoinLeft(from string, on string) *ORM {
	then.dataJoin = append(then.dataJoin, fmt.Sprintf("LEFT JOIN %s on %s", from, on))
	return then
}
func (then *ORM) JoinRight(from string, on string) *ORM {
	then.dataJoin = append(then.dataJoin, fmt.Sprintf("RIGHT JOIN %s on %s", from, on))
	return then
}
func (then *ORM) Limit(limit string) *ORM {
	then.dataLimit = limit
	return then
}
func (then *ORM) Offset(offset string) *ORM {
	then.dataOffset = offset
	return then
}
func (then *ORM) buildSelect() {
	then.dataBuilder = "SELECT "
	for i, item := range then.dataSelect {
		then.dataBuilder += item
		if i != (len(then.dataSelect) - 1) {
			then.dataBuilder += ","
		}
	}
}
func (then *ORM) buildFrom() {
	then.dataBuilder += fmt.Sprintf(" from %s ", then.dataFrom)
}
func (then *ORM) buildWhere() {
	if len(then.dataWhere) > 0 {
		then.dataBuilder += " WHERE "
		for i, item := range then.dataWhere {
			then.dataBuilder += item
			if i != (len(then.dataWhere) - 1) {
				then.dataBuilder += " "
			}
		}
	}
}
func (then *ORM) buildOrderBy() {
	if len(then.dataOrderBy) > 0 {
		then.dataBuilder += " ORDER BY "
		for i, item := range then.dataOrderBy {
			then.dataBuilder += item
			if i != (len(then.dataOrderBy) - 1) {
				then.dataBuilder += ","
			}
		}
	}
}
func (then *ORM) buildJoin() {
	if len(then.dataJoin) > 0 {
		for i, item := range then.dataJoin {
			then.dataBuilder += item
			if i != (len(then.dataJoin) - 1) {
				then.dataBuilder += " "
			}
		}
	}
}
func (then *ORM) Build() *ORMSystem {
	then.buildSelect()
	then.buildFrom()
	then.buildJoin()
	then.buildWhere()
	then.buildOrderBy()
	then.buildLimit()
	then.buildOffset()
	return new(ORMSystem).Init(then.dataBuilder, then.dataWhereMap)
}
func (then *ORM) buildLimit() {
	if len(then.dataLimit) > 0 {
		then.dataBuilder += fmt.Sprintf(" LIMIT %s ", then.dataLimit)
	}
}
func (then *ORM) buildOffset() {
	if len(then.dataOffset) > 0 {
		then.dataBuilder += fmt.Sprintf(" OFFSET %s ", then.dataOffset)
	}
}

func (then *ORM) ClearSelect() {
	then.dataSelect = make([]string, 0)
}

func (then *ORM) ClearLimit() *ORM {
	then.dataLimit = ""
	return then
}

func (then *ORM) ClearOffset() *ORM {
	then.dataOffset = ""
	return then
}

func (then *ORM) ClearOrderBy() *ORM {
	then.dataOrderBy = make([]string, 0)
	return then
}

// ----------------------- ORM System BUILD QUERY -----------------------
type ORMSystem struct {
	dataBuilder string
	dataArgs    []interface{}
}
type MetalScanner struct {
	valid bool
	value interface{}
}

func (then *ORMSystem) GetAll(db *sql.DB) (data []interface{}) {
	somevars := then.dataArgs
	rows, err := db.Query(then.dataBuilder, somevars...)
	if err != nil {
		println(err.Error())
		return
	}
	defer rows.Close()
	cols, _ := rows.Columns()

	for rows.Next() {
		// Create a slice of interface{}'s to represent each column,
		// and a second slice to contain pointers to each item in the columns slice.
		columns := make([]interface{}, len(cols))
		columnPointers := make([]interface{}, len(cols))
		for i, _ := range columns {
			columnPointers[i] = &columns[i]
		}

		// Scan the result into the column pointers...
		if err := rows.Scan(columnPointers...); err != nil {
			println(err.Error())
			return
		}

		// Create our map, and retrieve the value for each column from the pointers slice,
		// storing it in the map with the name of the column as the key.
		m := make(map[string]interface{})
		for i, colName := range cols {
			val := columnPointers[i].(*interface{})
			m[colName] = *val
		}

		// Outputs: map[columnName:value columnName2:value2 columnName3:value3 ...]
		data = append(data, m)
	}
	return
}
func (then *ORMSystem) Get() {

}
func (then *ORMSystem) Create() {

}
func (then *ORMSystem) Update() {

}
func (then *ORMSystem) Delete() {

}
func (then *ORMSystem) Init(dataBuilder string, dataArgs []interface{}) *ORMSystem {
	then.dataBuilder = dataBuilder
	then.dataArgs = dataArgs
	return then
}
func (then *ORMSystem) ToSql() (string, []interface{}) {
	return then.dataBuilder, then.dataArgs
}

// ----------------------- ORM System BUILD INSERT -----------------------
type ORMInsert struct {
	dataFrom         string
	dataValuesColumn []interface{}
	dataValuesValue  []interface{}
	dataBuilder      string
}

func (then *ORMInsert) From(from string) {
	then.dataFrom = from
}
func (then *ORMInsert) Add(attr string, value interface{}) {
	then.dataValuesColumn = append(then.dataValuesColumn, attr)
	then.dataValuesValue = append(then.dataValuesValue, value)
}
func (then *ORMInsert) Build() *ORMAction {
	then.buildInsert()
	return new(ORMAction).Init(then.dataBuilder, then.dataValuesValue)
}
func (then *ORMInsert) buildInsert() {
	then.dataBuilder = "INSERT INTO "
	then.dataBuilder += then.dataFrom
	then.dataBuilder += "("
	for i, item := range then.dataValuesColumn {
		then.dataBuilder += fmt.Sprintf("\"%s\"", item.(string))
		if i != (len(then.dataValuesColumn) - 1) {
			then.dataBuilder += ", "
		}
	}
	then.dataBuilder += ")"
	then.dataBuilder += " VALUES("

	for i := range then.dataValuesValue {
		then.dataBuilder += fmt.Sprintf("$%d", i+1)
		if i != (len(then.dataValuesValue) - 1) {
			then.dataBuilder += ", "
		}
	}
	then.dataBuilder += ")"
}

// ----------------------- ORM System BUILD SYSTEM INSERT/UPDATE/DELETE -----------------------
type ORMAction struct {
	dataBuilder string
	dataValues  []interface{}
}

func (then *ORMAction) ToString() (string, []interface{}) {
	return then.dataBuilder, then.dataValues
}

func (then *ORMAction) Save(db *sql.DB) (id int64, affected int64, error error) {
	res, e := db.Exec(then.dataBuilder, then.dataValues...)
	if e != nil {
		error = e
		return
	}
	id, _ = res.LastInsertId()
	affected, _ = res.RowsAffected()
	error = e
	return
}
func (then *ORMAction) Init(builder string, value []interface{}) *ORMAction {
	then.dataBuilder = builder
	then.dataValues = value
	return then
}

// ----------------------- ORM System BUILD UPDATE -----------------------
type ORMUpdate struct {
	dataFrom         string
	dataValuesColumn []interface{}
	dataValuesValue  []interface{}
	dataWhere        []interface{}
	dataWhereValues  []interface{}
	dateIndexValue   uint
	dataBuilder      string
}

func (then *ORMUpdate) From(from string) *ORMUpdate {
	then.dataFrom = from
	return then
}
func (then *ORMUpdate) Where(attr string, action string, value interface{}) *ORMUpdate {
	then.dateIndexValue++
	then.dataWhere = append(then.dataWhere, fmt.Sprintf("\"%s\" %s $%d", attr, action, then.dateIndexValue))
	then.dataWhereValues = append(then.dataWhereValues, value)
	return then
}
func (then *ORMUpdate) WhereAnd(attr string, action string, value interface{}) *ORMUpdate {
	then.dateIndexValue++
	then.dataWhere = append(then.dataWhere, fmt.Sprintf("\"%s\" %s $%d and ", attr, action, then.dateIndexValue))
	then.dataWhereValues = append(then.dataWhereValues, value)
	return then
}
func (then *ORMUpdate) WhereOr(attr string, action string, value interface{}) *ORMUpdate {
	then.dateIndexValue++
	then.dataWhere = append(then.dataWhere, fmt.Sprintf("\"%s\" %s $%d or ", attr, action, then.dateIndexValue))
	then.dataWhereValues = append(then.dataWhereValues, value)
	return then
}
func (then *ORMUpdate) Add(attr string, value interface{}) *ORMUpdate {
	then.dateIndexValue++
	then.dataValuesColumn = append(then.dataValuesColumn, attr)
	then.dataValuesValue = append(then.dataValuesValue, value)
	then.dataWhereValues = append(then.dataWhereValues, value)
	return then
}
func (then *ORMUpdate) Build() *ORMAction {
	then.buildUpdate()
	return new(ORMAction).Init(then.dataBuilder, then.dataWhereValues)
}
func (then *ORMUpdate) buildUpdate() {
	then.dataBuilder = "UPDATE "
	then.dataBuilder += then.dataFrom
	then.dataBuilder += " SET "
	for i, item := range then.dataValuesColumn {
		then.dataBuilder += fmt.Sprintf("\"%s\"", item.(string))
		then.dataBuilder += fmt.Sprintf("=$%d", i+1)
		if i != (len(then.dataValuesColumn) - 1) {
			then.dataBuilder += ", "
		}
	}
	if len(then.dataWhere) > 0 {
		then.dataBuilder += " WHERE "
		for _, item := range then.dataWhere {
			then.dataBuilder += item.(string)
		}
	}
}

// ----------------------- ORM System BUILD DELETE -----------------------
type ORMDelete struct {
	dataFrom         string
	dataValuesColumn []interface{}
	dataValuesValue  []interface{}
	dataWhere        []interface{}
	dataWhereValues  []interface{}
	dateIndexValue   uint
	dataBuilder      string
}

func (then *ORMDelete) From(from string) {
	then.dataFrom = from
}
func (then *ORMDelete) Where(attr string, action string, value interface{}) {
	then.dateIndexValue++
	then.dataWhere = append(then.dataWhere, fmt.Sprintf("\"%s\" %s $%d", attr, action, then.dateIndexValue))
	then.dataWhereValues = append(then.dataWhereValues, value)
}
func (then *ORMDelete) WhereAnd(attr string, action string, value interface{}) {
	then.dateIndexValue++
	then.dataWhere = append(then.dataWhere, fmt.Sprintf("\"%s\" %s $%d and", attr, action, then.dateIndexValue))
	then.dataWhereValues = append(then.dataWhereValues, value)
}
func (then *ORMDelete) WhereOr(attr string, action string, value interface{}) {
	then.dateIndexValue++
	then.dataWhere = append(then.dataWhere, fmt.Sprintf("\"%s\" %s $%d or", attr, action, then.dateIndexValue))
	then.dataWhereValues = append(then.dataWhereValues, value)
}
func (then *ORMDelete) Build() *ORMAction {
	then.buildDelete()
	return new(ORMAction).Init(then.dataBuilder, then.dataWhereValues)
}
func (then *ORMDelete) buildDelete() {
	then.dataBuilder = "DELETE FROM "
	then.dataBuilder += then.dataFrom
	if len(then.dataWhere) > 0 {
		then.dataBuilder += " WHERE "
		for _, item := range then.dataWhere {
			then.dataBuilder += item.(string)
		}
	}
}
